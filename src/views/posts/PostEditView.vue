<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
  <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" />
</template>

<script setup>
import { getPostsById, updatePost } from '@/api/posts';
import AppAlert from '@/components/AppAlert.vue';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
});
const fetchPost = async () => {
  const { data } = await getPostsById(id);
  setForm(data);
};
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
fetchPost();
const edit = async () => {
  try {
    await updatePost(id, { ...form.value });
    // router.push({ name: 'PostDetail', params: { id } });
    vAlert('수정이 완료되었습니다!', 'success');
  } catch (error) {
    console.error(error);
    vAlert('네트워크 오류');
  }
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');
const vAlert = (message, type = 'error') => {
  showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
