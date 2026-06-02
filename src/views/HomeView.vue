<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ArticleCard from '@/components/article/ArticleCard.vue';
import BranchCard from '@/components/branch/BranchCard.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';
import ServiceCard from '@/components/service/ServiceCard.vue';
import type { Article } from '@/domain/article';
import type { Branch } from '@/domain/branch';
import type { SiteSettings } from '@/domain/common';
import type { Product } from '@/domain/product';
import type { Service } from '@/domain/service';
import { getArticles } from '@/repositories/articleRepository';
import { getBranches } from '@/repositories/branchRepository';
import { getProducts } from '@/repositories/productRepository';
import { getServices } from '@/repositories/serviceRepository';
import { getSiteSettings } from '@/repositories/siteRepository';

const settings = ref<SiteSettings | null>(null);
const products = ref<Product[]>([]);
const services = ref<Service[]>([]);
const branches = ref<Branch[]>([]);
const articles = ref<Article[]>([]);

onMounted(async () => {
  const [site, featuredProducts, featuredServices, activeBranches, featuredArticles] = await Promise.all([
    getSiteSettings(),
    getProducts({ featuredOnly: true }),
    getServices({ featuredOnly: true }),
    getBranches(),
    getArticles({ featuredOnly: true }),
  ]);

  settings.value = site;
  products.value = featuredProducts;
  services.value = featuredServices.slice(0, 6);
  branches.value = activeBranches.slice(0, 2);
  articles.value = featuredArticles.slice(0, 6);
});
</script>

<template>
  <section class="relative overflow-hidden bg-midnight text-white">
    <img
      src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2200&auto=format&fit=crop"
      alt="Shinwa Pro Garage sửa chữa bảo dưỡng ô tô tại Đà Nẵng"
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/86 to-shinwa/40"></div>
    <div class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 to-transparent"></div>
    <Container>
      <div class="relative grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div class="pt-8">
          <div class="mb-5 flex flex-wrap gap-2">
            <span class="rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-orange-200">Garage kỹ thuật Đà Nẵng</span>
            <span class="rounded-full bg-emerald-400/16 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Cứu hộ 24/7</span>
          </div>
          <h1 class="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            {{ settings?.siteName ?? 'Shinwa Pro Garage' }}
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            {{ settings?.tagline ?? 'Nâng cấp, chăm sóc và quản lý dịch vụ ô tô chuyên nghiệp' }}.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <CTAButton to="/dich-vu">Xem dịch vụ</CTAButton>
            <CTAButton :href="`tel:${settings?.hotline ?? '0379147896'}`" variant="secondary">Gọi hotline</CTAButton>
          </div>
          <div class="mt-8 grid max-w-2xl gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div class="rounded-md border border-white/10 bg-white/10 p-3 backdrop-blur">
              Bảo dưỡng từ <strong class="text-white">1.200.000đ</strong>
            </div>
            <div class="rounded-md border border-white/10 bg-white/10 p-3 backdrop-blur">
              Rửa xe từ <strong class="text-white">120.000đ</strong>
            </div>
            <div class="rounded-md border border-white/10 bg-white/10 p-3 backdrop-blur">
              Điện lạnh từ <strong class="text-white">600.000đ</strong>
            </div>
          </div>
        </div>
        <div class="hero-shine overflow-hidden rounded-lg border border-white/10 bg-white/10 p-6 shadow-premium backdrop-blur">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-md bg-white p-5 text-ink">
              <p class="text-3xl font-black">4.8/5</p>
              <p class="mt-1 text-sm text-steel">Đánh giá tổng hợp</p>
            </div>
            <div class="rounded-md bg-white p-5 text-ink">
              <p class="text-3xl font-black">47</p>
              <p class="mt-1 text-sm text-steel">Lượt review</p>
            </div>
            <div class="rounded-md bg-white p-5 text-ink">
              <p class="text-3xl font-black">07:30</p>
              <p class="mt-1 text-sm text-steel">Mở cửa mỗi ngày</p>
            </div>
            <div class="rounded-md bg-white p-5 text-ink">
              <p class="text-3xl font-black">Rõ giá</p>
              <p class="mt-1 text-sm text-steel">Xác nhận trước khi làm</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>

  <section class="-mt-10 relative z-10">
    <Container>
      <div class="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-premium md:grid-cols-4">
        <RouterLink to="/dich-vu/cuu-ho-o-to-24-7-da-nang" class="rounded-md bg-midnight p-5 text-white transition hover:-translate-y-1">
          <p class="text-sm font-bold uppercase tracking-wide text-orange-200">Khẩn cấp</p>
          <p class="mt-2 text-xl font-black">Cứu hộ 24/7</p>
          <p class="mt-2 text-sm text-slate-300">Kích bình, kéo xe, thay lốp</p>
        </RouterLink>
        <RouterLink to="/dich-vu/rua-xe-cao-cap-da-nang" class="rounded-md bg-blue-50 p-5 transition hover:-translate-y-1 hover:bg-blue-100">
          <p class="text-sm font-bold uppercase tracking-wide text-shinwa">Chăm sóc</p>
          <p class="mt-2 text-xl font-black text-ink">Rửa xe cao cấp</p>
          <p class="mt-2 text-sm text-steel">Sạch kỹ, hạn chế xước sơn</p>
        </RouterLink>
        <RouterLink to="/dich-vu/bao-hiem-o-to-da-nang" class="rounded-md bg-orange-50 p-5 transition hover:-translate-y-1 hover:bg-orange-100">
          <p class="text-sm font-bold uppercase tracking-wide text-ember">Hồ sơ</p>
          <p class="mt-2 text-xl font-black text-ink">Bảo hiểm ô tô</p>
          <p class="mt-2 text-sm text-steel">Tư vấn quyền lợi, bồi thường</p>
        </RouterLink>
        <RouterLink to="/lien-he" class="rounded-md border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-shinwa">
          <p class="text-sm font-bold uppercase tracking-wide text-steel">Hotline</p>
          <p class="mt-2 text-xl font-black text-ink">{{ settings?.hotline ?? '0379147896' }}</p>
          <p class="mt-2 text-sm text-steel">Mở cửa 07:30 - 18:00</p>
        </RouterLink>
      </div>
    </Container>
  </section>

  <section class="py-16">
    <Container>
      <SectionHeading
        eyebrow="Dịch vụ nổi bật"
        title="Sửa chữa, bảo dưỡng và chăm sóc xe trong một quy trình gọn"
        description="Từ bảo dưỡng định kỳ đến gầm máy, đồng sơn, điện lạnh và detailing, Shinwa tập trung vào kiểm tra rõ, báo giá minh bạch và giao xe đúng hẹn."
      />
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </Container>
  </section>

  <section class="bg-midnight py-16 text-white">
    <Container>
      <SectionHeading
        eyebrow="Quy trình Shinwa"
        title="Từ tiếp nhận đến bàn giao, mọi thứ đều có mốc rõ"
        description="Khách hàng biết xe đang ở đâu trong quy trình, hạng mục nào cần làm và chi phí nào đã được xác nhận."
        inverse
      />
      <div class="grid gap-4 md:grid-cols-4">
        <div class="rounded-lg border border-white/10 bg-white/[0.08] p-6">
          <p class="text-3xl font-black text-ember">01</p>
          <p class="mt-4 font-black">Tiếp nhận triệu chứng</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">Ghi nhận dòng xe, số km, nhu cầu và dấu hiệu bất thường.</p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/[0.08] p-6">
          <p class="text-3xl font-black text-ember">02</p>
          <p class="mt-4 font-black">Kiểm tra kỹ thuật</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">Rà soát theo hạng mục, ưu tiên lỗi ảnh hưởng an toàn.</p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/[0.08] p-6">
          <p class="text-3xl font-black text-ember">03</p>
          <p class="mt-4 font-black">Báo giá xác nhận</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">Tách hạng mục cần làm ngay và hạng mục có thể theo dõi.</p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/[0.08] p-6">
          <p class="text-3xl font-black text-ember">04</p>
          <p class="mt-4 font-black">Thi công & bàn giao</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">Kiểm tra lại, tư vấn bảo hành và nhắc lịch bảo dưỡng.</p>
        </div>
      </div>
    </Container>
  </section>

  <section class="bg-white py-16">
    <Container>
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Sản phẩm"
          title="Gói dịch vụ, vật tư và phụ kiện khách hay hỏi"
          description="Bảo dưỡng, rửa xe, detailing, cứu hộ, bảo hiểm, lốp, ắc quy và phụ kiện đều được tư vấn theo tình trạng xe."
        />
        <CTAButton to="/san-pham" variant="ghost">Tất cả sản phẩm</CTAButton>
      </div>
      <ProductGrid :products="products" />
    </Container>
  </section>

  <section class="py-16">
    <Container>
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <SectionHeading
            eyebrow="Vì sao chọn chúng tôi"
            title="Có kỹ thuật, có minh bạch"
            description="Shinwa Pro Garage xây trải nghiệm quanh việc kiểm tra đúng, giải thích dễ hiểu và để khách xác nhận trước khi làm."
          />
        </div>
        <div class="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <p class="font-black text-ink">Báo giá trước</p>
            <p class="mt-3 text-sm leading-6 text-steel">Chi phí và hạng mục được xác nhận trước khi thi công.</p>
          </div>
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <p class="font-black text-ink">Tiến độ rõ</p>
            <p class="mt-3 text-sm leading-6 text-steel">Thời gian tiếp nhận và hoàn thành được tư vấn theo từng xe.</p>
          </div>
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <p class="font-black text-ink">Lưu lịch sử xe</p>
            <p class="mt-3 text-sm leading-6 text-steel">Dễ theo dõi bảo hành và nhắc lịch bảo dưỡng định kỳ.</p>
          </div>
        </div>
      </div>
    </Container>
  </section>

  <section class="bg-white py-16">
    <Container>
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div class="media-fallback overflow-hidden rounded-lg shadow-premium">
          <img
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1400&auto=format&fit=crop"
            alt="Xưởng dịch vụ Shinwa Pro Garage"
            class="aspect-[4/3] h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Cam kết trải nghiệm"
            title="Không chỉ sửa xe, Shinwa giúp khách yên tâm hơn khi dùng xe"
            description="Một website đẹp phải bán được niềm tin. Một garage tốt phải giữ được niềm tin đó bằng quy trình và giao tiếp rõ ràng."
          />
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-md border border-slate-200 p-4">
              <p class="font-black text-ink">Không phát sinh mập mờ</p>
              <p class="mt-2 text-sm leading-6 text-steel">Hạng mục ngoài báo giá phải được xác nhận lại.</p>
            </div>
            <div class="rounded-md border border-slate-200 p-4">
              <p class="font-black text-ink">Tư vấn theo xe thật</p>
              <p class="mt-2 text-sm leading-6 text-steel">Không ép gói khi xe chưa cần hoặc chưa phù hợp.</p>
            </div>
            <div class="rounded-md border border-slate-200 p-4">
              <p class="font-black text-ink">Có cứu hộ khi cần</p>
              <p class="mt-2 text-sm leading-6 text-steel">Hotline tiếp nhận sự cố và điều phối hỗ trợ.</p>
            </div>
            <div class="rounded-md border border-slate-200 p-4">
              <p class="font-black text-ink">Hỗ trợ sau sửa</p>
              <p class="mt-2 text-sm leading-6 text-steel">Theo dõi bảo hành, lịch bảo dưỡng và hồ sơ bảo hiểm.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>

  <section class="bg-white py-16">
    <Container>
      <SectionHeading eyebrow="Chi nhánh" title="Shinwa Pro Garage tại Đà Nẵng" />
      <div class="grid gap-6 md:grid-cols-2">
        <BranchCard v-for="branch in branches" :key="branch.id" :branch="branch" />
      </div>
    </Container>
  </section>

  <section class="py-16">
    <Container>
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Tin tức" title="Kinh nghiệm chăm sóc, cứu hộ và bảo hiểm xe" />
        <CTAButton to="/tin-tuc" variant="ghost">Xem tất cả</CTAButton>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
    </Container>
  </section>

  <section class="bg-ink py-16 text-white">
    <Container>
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-3xl font-black">Xe có dấu hiệu bất thường?</p>
          <p class="mt-3 text-slate-300">Gọi Shinwa để được tư vấn lịch kiểm tra, bảo dưỡng hoặc sửa chữa.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <CTAButton :href="`tel:${settings?.hotline ?? '0379147896'}`">Gọi hotline</CTAButton>
          <CTAButton to="/lien-he" variant="ghost">Thông tin liên hệ</CTAButton>
        </div>
      </div>
    </Container>
  </section>
</template>
