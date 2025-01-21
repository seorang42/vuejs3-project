<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
  </div>
  <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
  <AppAlert :items="alerts" />
</template>

<script setup>
import { getPostsById, updatePost } from '@/api/posts';
import AppError from '@/components/app/AppError.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
});
const error = ref(null);
const loading = ref(false);

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostsById(id);
    setForm(data);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
fetchPost();
const editError = ref(null);
const editLoading = ref(false);
const edit = async () => {
  try {
    editLoading.value = true;
    await updatePost(id, { ...form.value });
    router.push({ name: 'PostDetail', params: { id } });
    vSuccess('수정이 완료되었습니다!');
  } catch (error) {
    editError.value = error;
    vAlert(error.message);
  } finally {
    editLoading.value = false;
  }
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

const { vAlert, vSuccess } = useAlert();
</script>

<style lang="scss" scoped></style>
