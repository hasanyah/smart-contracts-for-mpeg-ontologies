<script>
export default {
    props: ['title', 'type']
}
</script>

<template>
<component :is="type" :title="title"/>
</template>