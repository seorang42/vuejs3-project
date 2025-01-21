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
  <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
  <AppAlert :items="alerts" />
</template>

<script setup>
import { getPostsById, updatePost } from '@/api/posts';
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
  try {
    const { data } = await getPostsById(id);
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
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
    vAlert(error.message);
  }
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert
/* const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref(''); */

const alerts = ref([]);
const vAlert = (message, type = 'error') => {
  alerts.value.push({ message, type });
  /* showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type; */
  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
