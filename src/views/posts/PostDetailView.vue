<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
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
        <button
          class="btn btn-outline-danger"
          @click="removePost"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
    <!-- {{ $route.params }}
    {{ $route.query }}
    {{ $route.hash }} -->
  </div>
</template>

<script setup>
import { deletePost, getPostsById } from '@/api/posts';
import AppError from '@/components/app/AppError.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import { useAlert } from '@/composables/alert';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const id = route.params.id;
const post = ref({
  title: null,
  content: null,
  createdAt: null,
});
const error = ref(null);
const loading = ref(false);

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostsById(props.id);
    setPost(data);
    /* post.title = data.title;
  post.content = data.content;
  post.createdAt = data.createdAt; */
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
fetchPost();

const removeError = ref(null);
const removeLoading = ref(false);
const removePost = async () => {
  try {
    if (!confirm('삭제 하시겠습니까?')) {
      return;
    }
    removeLoading.value = true;
    await deletePost(props.id);
    router.push({ name: 'PostList' });
  } catch (err) {
    vAlert(err.message);
    removeError.value = err;
  } finally {
    removeLoading.value = false;
  }
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });

const { vAlert } = useAlert();
</script>

<style lang="scss" scoped></style>
