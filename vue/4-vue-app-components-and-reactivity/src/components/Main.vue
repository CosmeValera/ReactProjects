<script setup>
    import {ref} from 'vue';
    const quote = ref("First, solve the problem. Then write the code.")
    const author = ref("John Johnson")
</script>

<template>
    <main>
        <section>
            <p>{{ quote }}</p>
            <span>{{ author}}</span>
        </section>
        <button>Another!</button>
    </main>
</template>

<style scoped>
/* MAIN CSS */
main {
    background: #CCD6D9;
    max-width:90%;
    border-radius:0 15px 0 15px;
    padding:35px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
}

main section {
    display: flex;
    width:100%;
    flex-direction:column;
    gap:10px;
    margin-bottom:25px;
}

main p {
    font-weight:bold;
    font-style: italic;
    font-size:2rem;
    text-align:left;
}

main p::before {
    content: '"'
}

main p::after {
    content: '"'
}

main span {
    align-self:end;
    color: #406473;
}

main span::before {
    content: "- "
}

main button {
    background:#406473;
    color: white;
    padding:10px;
    border: 0;
    font-size:1.2rem;
    border-radius:0 5px 0 5px;
    font-weight:bold;
    margin-top:20px;
    cursor:pointer;
    transition: transform 0.2s;
}
main button:hover{
    transform: scale(1.05);
}
/**********/
</style>