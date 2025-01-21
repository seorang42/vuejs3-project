<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
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
        <button class="btn btn-outline-danger" @click="removePost">삭제</button>
      </div>
    </div>
    <!-- {{ $route.params }}
    {{ $route.query }}
    {{ $route.hash }} -->
  </div>
</template>

<script setup>
import { deletePost, getPostsById } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const id = route.params.id;
const post = ref({});
// const post = reactive({});

const fetchPost = async () => {
  try {
    const { data } = await getPostsById(props.id);
    setPost(data);
    /* post.title = data.title;
  post.content = data.content;
  post.createdAt = data.createdAt; */
  } catch (error) {
    console.error(error);
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
fetchPost();
const removePost = async () => {
  try {
    if (!confirm('삭제 하시겠습니까?')) {
      return;
    }
    await deletePost(props.id);
    router.push({ name: 'PostList' });
  } catch (error) {
    console.error(error);
  }
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
