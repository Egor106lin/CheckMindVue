<template>
    <div v-if="modelValue" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('components.profileSettings.deleteAccount.accountDeletion') }}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal()"></button>
                </div>
                <div class="modal-body">
                    <p>{{ username }}, {{ $t('components.profileSettings.deleteAccount.approve') }} {{ email }}?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="cancel()">
                        {{ $t('components.profileSettings.deleteAccount.cancel') }}
                    </button>
                    <button class="btn btn-danger" @click="confirm()">
                        {{ $t('components.profileSettings.deleteAccount.delete') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n';

const $t = useI18n().t

// eslint-disable-next-line
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const emit = defineEmits([
    'update:modelValue',
    'confirm',
    'cancel'
])

const confirm = () => {
    emit('confirm')
    closeModal()
}

const cancel = () => {
    emit('cancel')
    closeModal()
}

const closeModal = () => {
    emit('update:modelValue', false)
}

</script>

<style lang="css" scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    border-radius: 20px;
    border: none;
}

.btn-secondary {
    background-color: #232b86;
    border-radius: 15px;
    border: none;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}
</style>