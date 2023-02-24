<template>
    <div class="top-container">
        <form @submit.prevent="ban" class="container">
            <div class="element">
                <label class="label">Reason</label>
                <input class="filter-input in" type="text" name="reason" v-model="reason">
            </div>
            <div class="element">
                <button class="fancy-button but">Ban</button>
                <button class="fancy-button" @click="$emit('canceled')">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Ban",
    components: {
    },
    data() {
        return {
            reason: "",
        }
    },
    methods: {
        ban: function () {
            this.$emit('completed', { reason: this.reason });
        }
    }
}
</script >

<style scoped>
.top-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
}

.container {
    position: relative;
    background-color: #F0F0F4;
    margin-left: auto;
    margin-right: auto;
    top: 10%;
    width: fit-content;
    padding: 1% 1%;
    border-radius: 5px;
}

.element {
    padding-top: 15px;
}

.but {
    margin-right: 10px;
}

.label {
    font-size: 15pt;
    color: purple;
}

.in {
    height: 70px;
    width: 300px;
}

.filter-input {
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    border-style: solid;
    padding: 5px;
}
</style>