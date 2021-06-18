<template>
  <div class="container py-3">
    <div class="row mb-4">
      <div class="col-md-12 text-center text-lg-left">
        <h2 class="h2">Artikel Terbaru</h2>
        <p class="lead">Apa aja sih yang baru di Wakdemah ?</p>
      </div>
    </div>
    <div id="cards_landscape_wrap-2">
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4 d-flex" v-for="i in 6" :key="i">
          <div class="card card-shadow rounded bg-white card-flyer">
            <div class="card-body p-3 text-box">
              <div class="image-box">
                <a href="/statement-vs-expression/">
                  <img
                    class="card-img-top lazyload rounded mb-3 lazyloaded"
                    src="../../assets/img/content-c.png"
                    data-src="../../assets/img/content-c.png"
                    data-sizes="auto"
                    alt="content image"
                  />
                </a>
              </div>
              <div class="text-container">
                <h6 class="card-title h6">
                  <a class="text-dark" href="/cs-windows/"
                    >Persiapan Pemrograman C# di Windows dengan Visual Studio</a
                  >
                </h6>
                <div class="text-secondary small">
                  Pada tutorial ini, kita akan membahas persiapan yang harus
                  kamu lakukan untuk memulai pemrograman C# …
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-4">
        <ul class="pagination">
          <li class="page-item">
            <a href="/" class="page-link" aria-label="First"
              ><span aria-hidden="true">««</span></a
            >
          </li>
          <li class="page-item disabled">
            <a class="page-link" aria-label="Previous"
              ><span aria-hidden="true">«</span></a
            >
          </li>
          <li class="page-item active">
            <a class="page-link" href="/">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/page/2/">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/page/3/">3</a>
          </li>
          <li class="page-item disabled">
            <span aria-hidden="true">&nbsp;…&nbsp;</span>
          </li>
          <li class="page-item">
            <a class="page-link" href="/page/70/">70</a>
          </li>
          <li class="page-item">
            <a href="/page/2/" class="page-link" aria-label="Next"
              ><span aria-hidden="true">»</span></a
            >
          </li>
          <li class="page-item">
            <a href="/page/70/" class="page-link" aria-label="Last"
              ><span aria-hidden="true">»»</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
