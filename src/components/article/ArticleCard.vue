<script setup lang="ts">
import type { Article } from '@/domain/article';

defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-premium">
    <RouterLink :to="`/tin-tuc/${article.slug}`" class="block">
      <div class="media-fallback aspect-[16/10] overflow-hidden">
        <img
          :src="article.coverImageUrl"
          :alt="article.title"
          class="h-full w-full object-cover"
          loading="lazy"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
      </div>
      <div class="p-5">
        <p class="text-xs font-bold uppercase tracking-wide text-ember">{{ article.category }}</p>
        <h3 class="mt-2 text-xl font-black leading-snug text-ink group-hover:text-shinwa">{{ article.title }}</h3>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-steel">{{ article.excerpt }}</p>
        <p class="mt-4 text-xs font-semibold text-slate-500">
          {{ new Date(article.publishedAt).toLocaleDateString('vi-VN') }} · {{ article.authorName }}
        </p>
        <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-shinwa">
          <span>Đọc bài viết</span>
          <span class="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
