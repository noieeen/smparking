<template>
  <div>
    <nav id="sidebar">
      <div class="custom-menu">
        <button  type="button" id="sidebarCollapse" class="btn btn-primary" @click="closeMenu()">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4 pt-5">
        <h1>
          <a href="#" class="logo">SM</a>
          <span class="h6 ml-1">parking</span>
        </h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <h5 class="h6">Adjust per Zone</h5>
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Home</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="#">Home 1</a>
              </li>
              <li>
                <a href="#">Home 2</a>
              </li>
              <li>
                <a href="#">Home 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Pages</a>
            <ul class="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
              <li>
                <a href="#">Page 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <div class="mb-5">
          <h3 class="h6">Subscribe for newsletter</h3>
          <form action="#" class="colorlib-subscribe-form">
            <div class="form-group d-flex">
              <div class="icon">
                <span class="icon-paper-plane"></span>
              </div>
              <input type="text" class="form-control" placeholder="Enter Email Address" />
            </div>
          </form>
        </div>

        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  methods: {
    closeMenu() {
      if ($) {
        ("use strict");

        var fullHeight = function() {
          $(".js-fullheight").css("height", $(window).height());
          $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
          });
        };
        fullHeight();

        $("#sidebarCollapse").on("click", function() {
          $("#sidebar").toggleClass("active");
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "./src/assets/sidebar.scss";
#sidebar {
 min-height: 100vh;
}
</style>