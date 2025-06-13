<template>
<nav class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Название</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Главная</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">О компании</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Услуги
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Услуга 1</a></li>
            <li><a class="dropdown-item" href="#">Услуга 2</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Прайс</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" type="submit">Искать</button>
      </form>
    </div>
  </div>
</nav>
</template>

<script>

</script>

