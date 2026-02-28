<template>
    <div v-if="modelValue" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('components.groupsManagement.renameModal.title') }}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal()"></button>
                </div>
                <div class="modal-body">
                    <p v-html="$t('components.groupsManagement.renameModal.message', { name: groupName, id: groupID })"></p>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="newName" 
                        :placeholder="$t('components.groupsManagement.renameModal.placeholder')"
                        @keyup.enter="confirm"
                    >
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="cancel()">
                        {{ $t('components.groupsManagement.renameModal.cancel') }}
                    </button>
                    <button class="btn btn-primary" @click="confirm()" :disabled="!newName.trim()">
                        {{ $t('components.groupsManagement.renameModal.rename') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n';

const $t = useI18n().t

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    groupID: {
        type: [String, Number],
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'rename', 'cancel'])

const newName = ref(props.groupName || '')

watch(() => props.modelValue, (val) => {
    if (val) {
        newName.value = props.groupName || ''
    }
})

const confirm = () => {
    if (newName.value.trim()) {
        emit('rename', { title: newName.value.trim(), id: props.groupID })
        closeModal()
    }
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

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: none;
}

.btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.form-control {
    border-radius: 15px;
    border: 2px solid #f3f3f3;
    padding: 10px 15px;
}

.form-control:focus {
    border: 2px solid #3846D3;
    border-radius: 15px;
    box-shadow: none;
}
</style>