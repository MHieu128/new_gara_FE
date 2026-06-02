<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ArticleCard from '@/components/article/ArticleCard.vue';
import Container from '@/components/common/Container.vue';
import PageHero from '@/components/common/PageHero.vue';
import type { Article } from '@/domain/article';
import { getArticles } from '@/repositories/articleRepository';

const articles = ref<Article[]>([]);
const keyword = ref('');
const category = ref('');
const categories = computed(() => [...new Set(articles.value.map((article) => article.category))]);
const visibleArticles = computed(() => {
  const value = keyword.value.trim().toLowerCase();
  return articles.value
    .filter((article) => !category.value || article.category === category.value)
    .filter((article) => {
      if (!value) return true;
      return [article.title, article.excerpt, article.category, ...article.tags].join(' ').toLowerCase().includes(value);
    });
});

onMounted(async () => {
  articles.value = await getArticles();
});
</script>

<template>
  <PageHero
    eyebrow="News"
    title="Tin tức và kinh nghiệm ô tô"
    description="Các ghi chú ngắn giúp khách hàng chuẩn bị tốt hơn trước khi bảo dưỡng, sửa chữa hoặc chăm sóc xe."
  />
  <section class="py-12">
    <Container>
      <div class="mb-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto]">
        <input
          v-model="keyword"
          class="min-h-12 w-full rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-shinwa"
          placeholder="Tìm bài viết, ví dụ: cứu hộ, bảo hiểm, rửa xe..."
          type="search"
        />
        <div class="flex max-w-full gap-2 overflow-x-auto pb-1">
          <button
            class="whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold"
            :class="category === '' ? 'bg-ink text-white' : 'bg-slate-100 text-ink'"
            @click="category = ''"
          >
            Tất cả
          </button>
          <button
            v-for="item in categories"
            :key="item"
            class="whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold"
            :class="category === item ? 'bg-shinwa text-white' : 'bg-slate-100 text-ink'"
            @click="category = item"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <div v-if="visibleArticles.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard v-for="article in visibleArticles" :key="article.id" :article="article" />
      </div>
      <div v-else class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-steel">
        Không tìm thấy bài viết phù hợp.
      </div>
    </Container>
  </section>
</template>
