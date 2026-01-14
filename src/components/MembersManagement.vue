<template>
    <div class="card zone mb-2">
        <div class="card-body">
            <div class="card-title">
                <h3>Участники группы АБВ</h3>
            </div>
            <ElTable :data="tableData" class="rounded-5 mt-3">
                <ElTableColumn prop="number" label="№" sortable />
                <ElTableColumn prop="date" label="Дата"/>
                <ElTableColumn prop="name" label="Имя" />
                <ElTableColumn fixed="right" align="center" prop="admin">
                    <template #default="scope">
                        <div class="btn-group">
                            <button
                                v-if="scope.row.admin == 'True'"
                                class="btn btn-light"
                                @click="handleDelete(scope.row)"
                            >
                                Сделать администратором
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
import { ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus';


const tableData = ref([
  {
    number: 1,
    date: '2016-05-03',
    name: 'Том',
    address: 'ул. Грув, 189, Лос-',
    admin: 'True'
  },
  {
    number: 2,
    date: '2016-05-04',
    name: 'Том',
    address: 'ул. Грув, 189, Лос-Анджелес',
  },
  {
    number: 3,
    date: '2016-05-05',
    name: 'Том',
    address: 'ул. Грув, 189, Лос-Анджелес',
    admin: 'True'
  },
  {
    number: 4,
    date: '2016-05-06',
    name: 'Том',
    address: 'ул. Грув, 189, Лос-Анджелес',
  },
  // ... другие строки данных
])
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