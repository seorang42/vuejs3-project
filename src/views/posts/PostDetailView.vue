<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="router.push('/posts/10')">
          이전글
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="router.push('/posts/11')">
          다음글
        </button>
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
import AppError from '@/components/app/AppError.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import { useAlert } from '@/composables/alert';
import { useNumber } from '@/composables/number';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRefs } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다');
      router.push({ name: 'PostList' });
    },
    onError: () => {
      removeLoading.value = false;
    },
  },
);

const removePost = async () => {
  if (!confirm('삭제 하시겠습니까?')) {
    return;
  }
  execute();
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });

const { vSuccess } = useAlert();

onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave');
});
</script>
<script>
export default {
  beforeRouteEnter() {
    console.log('beforeRouteEnter');
  },
};
</script>

<style lang="scss" scoped></style>
