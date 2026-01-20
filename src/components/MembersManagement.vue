<template>
    <div class="card zone mb-2">
        <div class="card-body">
            <div class="row">
                <div class="col-11">
                    <div class="card-title">
                        <h3>{{ $t('components.membersManagement.title') }} "{{ groupName }}"</h3>
                    </div>
                </div>
                <div class="col-1">
                    <button class="btn btn-light rounded-5" @click="emit('cancel')">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>
            </div>
            <ElTable :data="tableData" class="rounded-5 mt-3">
                <ElTableColumn prop="number" :label="$t('components.membersManagement.№')" sortable />
                <ElTableColumn prop="admin" :label="$t('components.membersManagement.admin')">
                    <template #default="scope">
                        <div v-if="scope.row.admin">
                            <i class="bi bi-check-lg"></i>
                        </div>
                    </template>
                </ElTableColumn>
                <ElTableColumn prop="name" :label="$t('components.membersManagement.name')" />
                <ElTableColumn v-if="isAdmin" fixed="right" align="center" prop="admin">
                    <template #default="scope">
                        <div class="btn-group">
                            <button
                                v-if="!scope.row.admin && isAdmin"
                                class="btn btn-light"
                                @click="handleDelete(scope.row)"
                            >
                                {{ $t('components.membersManagement.makeAdmin') }}
                            </button>
                            <button
                                class="btn btn-danger"
                                @click="handleDelete(scope.row)"
                            >
                                <i class="bi bi-person-dash"></i>
                            </button>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, defineProps, defineEmits } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t
const store = useStore()
const tableData = ref()

// eslint-disable-next-line
const props = defineProps({
    groupName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits([
    'cancel'
])

onBeforeMount(async () => {
    try {
        await store.dispatch('getMembers', {
            groupID: 43,
        })
        tableData.value = store.getters.members
    } catch (error) {
        console.error('Ошибка:', error)
    }
    console.log(props.groupName)
})

</script>

<style lang="css" scoped>
.btn-primary {
    border-radius: 15px;
    background-color: #3846D3;
    border: none;
}
.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}

.btn-light {
    border-radius: 15px;
    border: none;
}

.zone {
    box-shadow: 10px 5px 5px #d1d1d1;
}
</style>