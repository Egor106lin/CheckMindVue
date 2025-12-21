<template>
    <div class="mt-2 mb-2">
        <div class="row">
            <div class="col-1">
                <p>1</p>
            </div>
            <div class="col-2">
                <p>Роль</p>
            </div>
            <div class="col">
                <p>Имя участника</p>
            </div>
            <div class="col-md-auto">
                <div class="btn-group">
                    <button class="btn btn-primary">
                        Сделать администратором
                        <i class="bi bi-person-up"></i>
                    </button>
                    <button class="btn btn-danger">
                        Удалить
                        <i class="bi bi-person-dash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

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
</style>