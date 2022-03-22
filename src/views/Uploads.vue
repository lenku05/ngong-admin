<template>
  <div class="uploads">
    <br /><br /><br />
    <div class="container">
      <div class="row">
        <h2 class="heading">Upload files</h2>
        <!-- <div class="subheading">our vission mission and core values</div> -->
        <hr class="container" />
        <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="alert alert-danger" v-if="error.state" role="alert">
            {{ error.message }}
          </div>
          <div class="alert alert-success" v-if="success.state" role="alert">
            {{ success.message }}
          </div>
          <form @submit.prevent="upload">
            <input
              type="text"
              class="form-control"
              placeholder="File title"
              required
              v-model="title"
            />
            <br />
            <input
              type="file"
              @change="fileUpload"
              class="form-control"
              placeholder="upload file"
              required
            />
            <br />

            <input
              class="btn btn-primary"
              type="submit"
              value="Upload a file"
            />
            <!-- <input type="text" v-model="content"> -->
          </form>
          <div class="card" v-for="(file, index) in files" :key="file.id">
            <div class="row">
              <div class="col-sm-1 col-md-1 col-lg-1">
                <div class="num">#{{ index + 1 }}</div>
              </div>
              <div class="col-sm-6 col-md-8 col-lg-8">
                <div class="card-body">
                  {{ file.title }}
                </div>
              </div>
              <div class="col-sm-5 col-md-3 col-lg-3">
                <button class="btn btn-danger" @click="deleteFile(file)">
                  Delete
                </button>
                <a class="btn btn-success" :href="file.file"> Download </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const file = ref("");
    const title = ref("");
    const date = ref(new Date().toISOString());

    const store = useStore();
    //    uploading method
    const upload = () => {
      store.dispatch("uploadFile", {
        title: title.value,
        file: file.value,
        date: date.value,
      });
      title.value = "";
      file.value = "";
    };
    const deleteFile = (file) => {
      store.dispatch("deleteFile", {
        title: file.title,
        file: file.file,
        id: file.id,
      });
    };

    store.dispatch("loadFiles");
    // after states
    const loading = computed(() => {
      return store.state.loading;
    });
    const error = computed(() => {
      return store.state.error;
    });
    const success = computed(() => {
      return store.state.success;
    });
    const files = computed(() => {
      return store.state.files;
    });

    // file upload
    const fileUpload = (e) => {
      let doc = e.target.files[0];
      file.value = doc;
    };
    return {
      loading,
      files,
      upload,
      deleteFile,
      fileUpload,
      title,
      error,
      success,
    };
  },
};
</script>

<style>
.create {
  padding-bottom: 70px;
}
.heading {
  letter-spacing: 2px;
  text-transform: capitalize;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
}
.subheading {
  letter-spacing: 7px;
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
}
hr {
  padding-bottom: 30px;
}
.height {
  height: 200px;
}

@media only screen and (max-width: 576px) {
  .heading {
    letter-spacing: 2px;
    text-transform: capitalize;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
  }
  .subheading {
    letter-spacing: 7px;
    text-transform: uppercase;
    text-align: center;
    font-size: 14px;
  }
}

.card {
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
}
.float-right {
  float: right;
}
.card .btn {
  margin: 2px;
  float: right;
}
.num {
  font-size: 16px;
  padding: 5px;
}
.card-body {
  padding: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
</style>
