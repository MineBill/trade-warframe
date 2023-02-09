<template>
    <div class="navigation">
        <ul class="login">
            <li class="login-element">
                <a>Register</a>
            </li>
            <li class="login-element">
                <button @click="show = !show">Log in</button>
                <!-- <dropdown :item="" @on-clicked="clicked"></dropdown> -->
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'NavagationBar',
    data() {
        return {
            show: false
        }
    }
}
</script>

<style>
.navigation {
    background-color: hotpink;
    position: sticky;
    top: 0;
    z-index: 100;
    height: 50px;
}

.login {
    /* float: right; */
    display: block;
    margin: 0px;
    padding: 10px;
    /* position: relative; */
    float: right;
    height: inherit;
    list-style-type: none;
}

.login-element {
    float: left;
    margin-top: auto;
    margin-bottom: auto;
}
</style>