<template>
<div id="form">
  <div>
    <textarea v-model="content" @input="autoTextAreaHeight" class="input"></textarea>
  </div>
</div>
</template>

<script>
export default {
  name: "answerForm",
  data(){
    return{
      content:""
    }
  },
  methods:{
    autoTextAreaHeight(e){
      e.target.style.height= 'auto'
      e.target.style.height = e.target.scrollHeight + "px"
    }
  }
}
</script>

<style scoped>
#form{
  width: 90%;
  margin: 20px 5%;
  padding-bottom: 10px;
  min-height: 250px;
  border-radius: 12px;
  background-color: #E2F5F0;
}
.input{
  width: 92%;
  font-size: 16px;
  min-height: 150px;
  line-height: 20px;
  margin-left: 4%;
  margin-top: 25px;
  border-radius: 12px;
  border: 0 solid #42b983;
  box-sizing: border-box;
  padding:10px 20px;
  resize: none;
}
.input:focus{
  outline-width: 0;
}
</style>
