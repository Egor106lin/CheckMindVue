<template>
    <div class="modal fade show d-block" tabindex="-1" v-if="props.modelValue">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('components.qrCode.title') }}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="cancel()"></button>
                </div>
                <div class="modal-body">
                    <img :src="qrCodeUrl" alt="QR Code" class="qr-image">
                </div>
                <div class="modal-footer">
                    <p><small>{{ $t('components.qrCode.scanForQuickAccess') }}</small></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    qrCodeUrl: {
        type: String
    }
})

const emits = defineEmits([
    'update:modelValue'
])

const cancel = () => {
    emits('update:modelValue', false)
}
</script>

<style lang="css" scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    width: fit-content;
    max-width: 100%;
}

.modal-content {
    border-radius: 20px;
    border: none;
}
</style>