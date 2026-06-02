<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import type { Article } from '@/domain/article';
import { getArticleBySlug } from '@/repositories/articleRepository';

const route = useRoute();
const article = ref<Article | null>(null);
const loading = ref(true);

async function loadArticle() {
  loading.value = true;
  article.value = await getArticleBySlug(String(route.params.slug));
  document.title = article.value ? article.value.seo.title : 'Không tìm thấy bài viết';
  loading.value = false;
}

onMounted(loadArticle);
watch(() => route.params.slug, loadArticle);
</script>

<template>
  <section class="py-10">
    <Container>
      <Breadcrumb :items="[{ label: 'Tin tức', to: '/tin-tuc' }, { label: article?.title ?? 'Chi tiết' }]" />
      <div v-if="loading" class="mt-10 rounded-lg bg-white p-8 text-steel">Đang tải bài viết...</div>
      <article v-else-if="article" class="mt-8">
        <div class="mx-auto max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-ember">{{ article.category }}</p>
          <h1 class="mt-3 text-4xl font-black leading-tight text-ink">{{ article.title }}</h1>
          <p class="mt-4 text-steel">
            {{ new Date(article.publishedAt).toLocaleDateString('vi-VN') }} · {{ article.authorName }}
          </p>
        </div>
        <div class="media-fallback mx-auto mt-8 aspect-[16/8] max-w-5xl overflow-hidden rounded-lg shadow-premium">
          <img
            :src="article.coverImageUrl"
            :alt="article.title"
            class="h-full w-full object-cover"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
        </div>
        <div class="prose-lite mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 text-lg text-steel shadow-sm">
          <p>{{ article.content }}</p>
        </div>
      </article>
      <div v-else class="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <h1 class="text-2xl font-black text-ink">Không tìm thấy bài viết</h1>
        <p class="mt-3 text-steel">Bài viết có thể chưa được xuất bản.</p>
        <CTAButton to="/tin-tuc" class="mt-6">Về danh sách tin tức</CTAButton>
      </div>
    </Container>
  </section>
</template>
