<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import GarageLoader from '@/components/common/GarageLoader.vue';
import {
  createResource,
  deleteResource,
  listResource,
  updateResource,
  type AdminRecord,
  type AdminResource,
} from '@/repositories/adminRepository';

type EditableResource = Exclude<AdminResource, 'leads'>;
type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select';
type FormValue = string | number | null | undefined;

interface FieldConfig {
  key: string;
  label: string;
  type?: FieldType;
  options?: { label: string; value: string }[];
}

interface ResourceConfig {
  title: string;
  resource: EditableResource;
  fields: FieldConfig[];
  columns: string[];
  defaults: Record<string, FormValue>;
  buildPayload: (model: Record<string, FormValue>) => Record<string, unknown>;
  toModel?: (item: AdminRecord) => Record<string, FormValue>;
}

const route = useRoute();
const items = ref<AdminRecord[]>([]);
const productCategories = ref<AdminRecord[]>([]);
const serviceCategories = ref<AdminRecord[]>([]);
const branches = ref<AdminRecord[]>([]);
const selected = ref<AdminRecord | null>(null);
const model = ref<Record<string, FormValue>>({});
const isLoading = ref(false);
const isSaving = ref(false);
const error = ref('');
const success = ref('');

const boolOptions = [
  { label: 'Có', value: 'true' },
  { label: 'Không', value: 'false' },
];

const priceOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'From', value: 'from' },
  { label: 'Contact', value: 'contact' },
];

const roleOptions = [
  { label: 'SuperAdmin', value: 'SuperAdmin' },
  { label: 'BranchManager', value: 'BranchManager' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Technician', value: 'Technician' },
  { label: 'ContentEditor', value: 'ContentEditor' },
];

const configs = computed<Record<string, ResourceConfig>>(() => ({
  products: {
    title: 'Products',
    resource: 'products',
    columns: ['name', 'slug', 'brand', 'priceLabel', 'isActive'],
    defaults: {
      categoryId: firstId(productCategories.value),
      name: '',
      slug: '',
      sku: '',
      brand: '',
      shortDescription: '',
      description: '',
      price: '',
      priceLabel: 'contact',
      images: '[]',
      specs: '{}',
      compatibleVehicles: '[]',
      tags: '',
      isFeatured: 'false',
      isActive: 'true',
    },
    fields: [
      selectField('categoryId', 'Category', productCategories.value),
      textField('name', 'Name'),
      textField('slug', 'Slug'),
      textField('sku', 'SKU'),
      textField('brand', 'Brand'),
      textareaField('shortDescription', 'Short description'),
      textareaField('description', 'Description'),
      numberField('price', 'Price'),
      { key: 'priceLabel', label: 'Price label', type: 'select', options: priceOptions },
      textareaField('images', 'Images JSON'),
      textareaField('specs', 'Specs JSON'),
      textareaField('compatibleVehicles', 'Compatible vehicles JSON'),
      textField('tags', 'Tags, comma separated'),
      boolField('isFeatured', 'Featured'),
      boolField('isActive', 'Active'),
    ],
    buildPayload: (value) => ({
      categoryId: stringValue(value.categoryId),
      name: stringValue(value.name),
      slug: stringValue(value.slug),
      sku: optionalString(value.sku),
      brand: optionalString(value.brand),
      shortDescription: stringValue(value.shortDescription),
      description: optionalString(value.description),
      price: optionalNumber(value.price),
      priceLabel: stringValue(value.priceLabel),
      images: parseJson(value.images, []),
      specs: parseJson(value.specs, {}),
      compatibleVehicles: parseJson(value.compatibleVehicles, []),
      tags: splitList(value.tags),
      isFeatured: boolValue(value.isFeatured),
      isActive: boolValue(value.isActive),
    }),
    toModel: jsonModel(['images', 'specs', 'compatibleVehicles'], ['tags']),
  },
  services: {
    title: 'Services',
    resource: 'services',
    columns: ['name', 'slug', 'priceLabel', 'estimatedDurationMinutes', 'isActive'],
    defaults: {
      categoryId: firstId(serviceCategories.value),
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      heroImageUrl: '',
      gallery: '[]',
      basePrice: '',
      priceLabel: 'contact',
      estimatedDurationMinutes: '',
      relatedProductIds: '',
      faqs: '[]',
      seo: '{}',
      isFeatured: 'false',
      isActive: 'true',
    },
    fields: [
      selectField('categoryId', 'Category', serviceCategories.value),
      textField('name', 'Name'),
      textField('slug', 'Slug'),
      textareaField('shortDescription', 'Short description'),
      textareaField('description', 'Description'),
      textField('heroImageUrl', 'Hero image URL'),
      textareaField('gallery', 'Gallery JSON'),
      numberField('basePrice', 'Base price'),
      { key: 'priceLabel', label: 'Price label', type: 'select', options: priceOptions },
      numberField('estimatedDurationMinutes', 'Duration minutes'),
      textField('relatedProductIds', 'Related product GUIDs, comma separated'),
      textareaField('faqs', 'FAQs JSON'),
      textareaField('seo', 'SEO JSON'),
      boolField('isFeatured', 'Featured'),
      boolField('isActive', 'Active'),
    ],
    buildPayload: (value) => ({
      categoryId: stringValue(value.categoryId),
      name: stringValue(value.name),
      slug: stringValue(value.slug),
      shortDescription: stringValue(value.shortDescription),
      description: optionalString(value.description),
      heroImageUrl: optionalString(value.heroImageUrl),
      gallery: parseJson(value.gallery, []),
      basePrice: optionalNumber(value.basePrice),
      priceLabel: stringValue(value.priceLabel),
      estimatedDurationMinutes: optionalNumber(value.estimatedDurationMinutes),
      relatedProductIds: splitList(value.relatedProductIds),
      faqs: parseJson(value.faqs, []),
      seo: parseJson(value.seo, {}),
      isFeatured: boolValue(value.isFeatured),
      isActive: boolValue(value.isActive),
    }),
    toModel: jsonModel(['gallery', 'faqs', 'seo'], ['relatedProductIds']),
  },
  branches: {
    title: 'Branches',
    resource: 'branches',
    columns: ['name', 'slug', 'province', 'address', 'isActive'],
    defaults: {
      name: '',
      slug: '',
      province: '',
      district: '',
      address: '',
      phoneNumbers: '',
      email: '',
      latitude: '',
      longitude: '',
      googleMapUrl: '',
      openingHours: '',
      services: '',
      isActive: 'true',
    },
    fields: [
      textField('name', 'Name'),
      textField('slug', 'Slug'),
      textField('province', 'Province'),
      textField('district', 'District'),
      textareaField('address', 'Address'),
      textField('phoneNumbers', 'Phones, comma separated'),
      textField('email', 'Email'),
      numberField('latitude', 'Latitude'),
      numberField('longitude', 'Longitude'),
      textField('googleMapUrl', 'Google map URL'),
      textField('openingHours', 'Opening hours'),
      textField('services', 'Service GUIDs, comma separated'),
      boolField('isActive', 'Active'),
    ],
    buildPayload: (value) => ({
      name: stringValue(value.name),
      slug: stringValue(value.slug),
      province: stringValue(value.province),
      district: optionalString(value.district),
      address: stringValue(value.address),
      phoneNumbers: splitList(value.phoneNumbers),
      email: optionalString(value.email),
      latitude: optionalNumber(value.latitude),
      longitude: optionalNumber(value.longitude),
      googleMapUrl: optionalString(value.googleMapUrl),
      openingHours: optionalString(value.openingHours),
      services: splitList(value.services),
      isActive: boolValue(value.isActive),
    }),
    toModel: jsonModel([], ['phoneNumbers', 'services']),
  },
  articles: {
    title: 'Articles',
    resource: 'articles',
    columns: ['title', 'slug', 'category', 'isPublished', 'isFeatured'],
    defaults: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImageUrl: '',
      category: '',
      tags: '',
      authorName: 'Shinwa Pro Garage',
      publishedAt: new Date().toISOString(),
      seo: '{}',
      isFeatured: 'false',
      isPublished: 'true',
    },
    fields: [
      textField('title', 'Title'),
      textField('slug', 'Slug'),
      textareaField('excerpt', 'Excerpt'),
      textareaField('content', 'Content'),
      textField('coverImageUrl', 'Cover image URL'),
      textField('category', 'Category'),
      textField('tags', 'Tags, comma separated'),
      textField('authorName', 'Author'),
      textField('publishedAt', 'Published at ISO'),
      textareaField('seo', 'SEO JSON'),
      boolField('isFeatured', 'Featured'),
      boolField('isPublished', 'Published'),
    ],
    buildPayload: (value) => ({
      title: stringValue(value.title),
      slug: stringValue(value.slug),
      excerpt: stringValue(value.excerpt),
      content: stringValue(value.content),
      coverImageUrl: optionalString(value.coverImageUrl),
      category: optionalString(value.category),
      tags: splitList(value.tags),
      authorName: optionalString(value.authorName),
      publishedAt: optionalString(value.publishedAt),
      seo: parseJson(value.seo, {}),
      isFeatured: boolValue(value.isFeatured),
      isPublished: boolValue(value.isPublished),
    }),
    toModel: jsonModel(['seo'], ['tags']),
  },
  users: {
    title: 'Users',
    resource: 'users',
    columns: ['fullName', 'email', 'role', 'isActive', 'lastLoginAt'],
    defaults: {
      fullName: '',
      email: '',
      phone: '',
      role: 'Sales',
      branchId: firstId(branches.value),
      isActive: 'true',
      password: '',
    },
    fields: [
      textField('fullName', 'Full name'),
      textField('email', 'Email'),
      textField('phone', 'Phone'),
      { key: 'role', label: 'Role', type: 'select', options: roleOptions },
      selectField('branchId', 'Branch', branches.value, true),
      boolField('isActive', 'Active'),
      textField('password', 'Password, blank keeps current'),
    ],
    buildPayload: (value) => ({
      fullName: stringValue(value.fullName),
      email: stringValue(value.email),
      phone: optionalString(value.phone),
      role: stringValue(value.role),
      branchId: optionalString(value.branchId),
      isActive: boolValue(value.isActive),
      password: optionalString(value.password),
    }),
  },
}));

const config = computed(() => {
  const key = String(route.meta.resource ?? 'products');
  return configs.value[key] ?? configs.value.products;
});

watch(config, () => {
  resetForm();
  load();
});

onMounted(async () => {
  await Promise.all([loadLookups(), load()]);
  resetForm();
});

async function loadLookups() {
  [productCategories.value, serviceCategories.value, branches.value] = await Promise.all([
    listResource('productCategories'),
    listResource('serviceCategories'),
    listResource('branches'),
  ]);
}

async function load() {
  isLoading.value = true;
  error.value = '';
  try {
    items.value = await listResource(config.value.resource);
  } catch {
    error.value = `Không tải được ${config.value.title}.`;
  } finally {
    isLoading.value = false;
  }
}

function resetForm() {
  selected.value = null;
  model.value = { ...config.value.defaults };
}

function edit(item: AdminRecord) {
  selected.value = item;
  model.value = config.value.toModel ? config.value.toModel(item) : { ...item, password: '' };
}

async function save() {
  isSaving.value = true;
  error.value = '';
  success.value = '';
  try {
    const payload = config.value.buildPayload(model.value);
    if (selected.value) {
      await updateResource(config.value.resource, selected.value.id, payload);
      success.value = 'Đã cập nhật.';
    } else {
      await createResource(config.value.resource, payload);
      success.value = 'Đã tạo mới.';
    }
    await load();
    resetForm();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Không lưu được dữ liệu.';
  } finally {
    isSaving.value = false;
  }
}

async function remove(item: AdminRecord) {
  if (!window.confirm(`Xóa/ẩn ${String(item.name ?? item.title ?? item.email ?? item.id)}?`)) return;
  await deleteResource(config.value.resource, item.id);
  await load();
}

function textField(key: string, label: string): FieldConfig {
  return { key, label, type: 'text' };
}

function textareaField(key: string, label: string): FieldConfig {
  return { key, label, type: 'textarea' };
}

function numberField(key: string, label: string): FieldConfig {
  return { key, label, type: 'number' };
}

function boolField(key: string, label: string): FieldConfig {
  return { key, label, type: 'select', options: boolOptions };
}

function selectField(key: string, label: string, records: AdminRecord[], allowBlank = false): FieldConfig {
  const options = records.map((item) => ({ label: String(item.name ?? item.fullName ?? item.id), value: item.id }));
  return { key, label, type: 'select', options: allowBlank ? [{ label: 'None', value: '' }, ...options] : options };
}

function jsonModel(jsonKeys: string[], listKeys: string[]) {
  return (item: AdminRecord) => {
    const output: Record<string, FormValue> = {};
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        output[key] = String(value);
      } else if (typeof value === 'string' || typeof value === 'number' || value === null || value === undefined) {
        output[key] = value;
      } else {
        output[key] = JSON.stringify(value);
      }
    });
    jsonKeys.forEach((key) => {
      output[key] = JSON.stringify(item[key] ?? (key === 'seo' || key === 'specs' ? {} : []), null, 2);
    });
    listKeys.forEach((key) => {
      output[key] = Array.isArray(item[key]) ? (item[key] as unknown[]).join(', ') : '';
    });
    if ('password' in output) output.password = '';
    return output;
  };
}

function parseJson(value: unknown, fallback: unknown): unknown {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  return JSON.parse(value);
}

function splitList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringValue(value: unknown): string {
  return String(value ?? '').trim();
}

function optionalString(value: unknown): string | null {
  const text = stringValue(value);
  return text ? text : null;
}

function optionalNumber(value: unknown): number | null {
  const text = stringValue(value);
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function boolValue(value: unknown): boolean {
  return value === true || value === 'true';
}

function firstId(records: AdminRecord[]): string {
  return records[0]?.id ?? '';
}
</script>

<template>
  <div>
    <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-black text-ink">{{ config.title }}</h1>
        <p class="mt-1 text-sm text-slate-500">Tạo, sửa và xóa dữ liệu quản trị.</p>
      </div>
      <button class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50" @click="resetForm">
        Tạo mới
      </button>
    </div>

    <div class="grid gap-5 xl:grid-cols-[420px_1fr]">
      <form class="rounded-lg border border-slate-200 bg-white p-4" @submit.prevent="save">
        <h2 class="text-lg font-black text-ink">{{ selected ? 'Cập nhật' : 'Tạo mới' }}</h2>
        <div class="mt-4 grid gap-3">
          <label v-for="field in config.fields" :key="field.key" class="block">
            <span class="text-xs font-bold uppercase tracking-wide text-slate-500">{{ field.label }}</span>
            <textarea
              v-if="field.type === 'textarea'"
              v-model="model[field.key]"
              class="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-shinwa"
            />
            <select
              v-else-if="field.type === 'select'"
              v-model="model[field.key]"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-shinwa"
            >
              <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <input
              v-else
              v-model="model[field.key]"
              :type="field.type === 'number' ? 'number' : 'text'"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-shinwa"
            />
          </label>
        </div>
        <p v-if="error" class="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{{ error }}</p>
        <p v-if="success" class="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{{ success }}</p>
        <button class="mt-4 w-full rounded-md bg-shinwa px-4 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60" :disabled="isSaving">
          {{ isSaving ? 'Đang lưu...' : 'Lưu' }}
        </button>
      </form>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <GarageLoader v-if="isLoading" compact label="Đang đồng bộ dữ liệu kho garage..." />
        <p v-else-if="!items.length" class="p-4 text-sm font-semibold text-slate-600">Chưa có dữ liệu.</p>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th v-for="column in config.columns" :key="column" class="px-4 py-3">{{ column }}</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="item in items" :key="item.id">
                <td v-for="column in config.columns" :key="column" class="max-w-xs truncate px-4 py-3 text-slate-700">
                  {{ item[column] }}
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  <button class="rounded-md px-3 py-1 text-xs font-bold text-shinwa hover:bg-blue-50" @click="edit(item)">Sửa</button>
                  <button class="rounded-md px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-50" @click="remove(item)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
