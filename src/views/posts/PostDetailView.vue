<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
    <!-- {{ $route.params }}
    {{ $route.query }}
    {{ $route.hash }} -->
  </div>
</template>

<script setup>
import { getPostsById } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: Number,
});

const router = useRouter();
// const id = route.params.id;
const form = ref({});
// const form = reactive({});

const fetchPost = () => {
  const data = getPostsById(props.id);
  form.value = { ...data };
  /* form.title = data.title;
  form.content = data.content;
  form.createdAt = data.createdAt; */
};
fetchPost();
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
