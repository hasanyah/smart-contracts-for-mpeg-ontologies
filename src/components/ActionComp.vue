<script>
import Provide from "./ProvideActionComp.vue"
import Play from "./PlayActionComp.vue"
import Payment from "./PaymentActionComp.vue"
import Distribute from "./DistributeActionComp.vue"

export default {
    props: ['title', 'type'],
    components: [
        Provide,
        Play,
        Payment,
        Distribute
    ]
}
</script>

<template>
<Payment :title="title"/>
</template>