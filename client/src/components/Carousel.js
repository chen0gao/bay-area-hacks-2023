import "./css/main.css";
import "./css/css.css";
import "./css/css1.css";
import "uikit/dist/js/uikit.js";

export default function Carousel() {
  //TODO: rework to incorporate static picture rather than URLs
  let styles = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')",
  };
  return (
    <div class="uk-container">
      <div
        class="uk-border-rounded-large uk-background-top-center uk-background-cover uk-background-norepeat uk-light uk-inline uk-overflow-hidden uk-width-1-1"
        style={styles}
      >
        <div class="uk-position-cover uk-header-overlay"></div>
        <div class="uk-position-relative" data-uk-grid="">
          <div class="uk-width-1-2@m uk-flex uk-flex-middle">
            <div class="uk-padding-large uk-padding-remove-right">
              <h1 class="uk-heading-small uk-margin-remove-top">
                Choose from thousands of recipes
              </h1>
            </div>
          </div>
          <div class="uk-width-expand@m"></div>
        </div>
      </div>
    </div>
  );
}
