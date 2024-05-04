<template>
  <div class="continuos-compoent">
    <div class="header text-12px text-text-4 flex justify-between">
      <div class="header-item ">
        <img
          class="h-9px"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjEzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjEzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1YmUwMzAyNy1iYjc0LTQ0MjctYTZhZS1iNzgwYjgxMGRkZGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NWJlMDMwMjctYmI3NC00NDI3LWE2YWUtYjc4MGI4MTBkZGRhIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NWJlMDMwMjctYmI3NC00NDI3LWE2YWUtYjc4MGI4MTBkZGRhIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YmUwMzAyNy1iYjc0LTQ0MjctYTZhZS1iNzgwYjgxMGRkZGEiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgWKRKkAAACtSURBVDiNrdTBDQFBFAbgb8XdNiBRwm4HGlADbk46kBDRgJMbKpCoQAmUoAMqWIflInaMmHecefnm5Z/MZFVVSVGtJAra7wuT6SzUn+OAfLNelkEoUL0nUkRN1FAFTug0NcRkNPqGxEw0wjbisCC0wzAGCUFHDGIRPmeU/4o0QTfsU0DUIS9SQDDHOAVEfXMl7v9CcEYf13+hF1bg0tTwy6O9qSdbofu+maX62B7pXBtb3vgOswAAAABJRU5ErkJggg=="
          alt=""
        />
        old
      </div>
      <div class="header-item">
        Trend data every 24 hours
      </div>
      <div class="header-item">
        new
        <img
          class="h-9px"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTMwVDIwOjMxOjU5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTMwVDIwOjMxOjU5KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNjQxNTA0MS1iNDJlLTRiYWUtOWZhOC1jNjhlNTA1NmU3ODYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YTY0MTUwNDEtYjQyZS00YmFlLTlmYTgtYzY4ZTUwNTZlNzg2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YTY0MTUwNDEtYjQyZS00YmFlLTlmYTgtYzY4ZTUwNTZlNzg2Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNjQxNTA0MS1iNDJlLTRiYWUtOWZhOC1jNjhlNTA1NmU3ODYiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuTkpRIAAACwSURBVDiNrdTNEcFAGAbgh3GnBB1ECVrQATcnDRgHowMntyhCAUqIEmgAFcQhcSHJhuw3s5f9eebd2W+2l+e5GNWPomDwObFcbTLcMcOj7uBhvwsmSjDFGeO2iZquliDDpCsEQ0WyeVfojaUh7JdXS8vRGaJIVYn900dzjGJARxX99Su0xaJq4auzG2pRpqmsNtBT0elZ06bQ1a5tkFCiS4k8QkgddMIN67YI9GJ9bC/40x/22uWGSAAAAABJRU5ErkJggg=="
          alt=""
        />
      </div>
    </div>
    <div class="body overflow-auto ">
      <div class="flex gap-12px mt-12px">
        <div class="item  flex-shrink-0 flex flex-col gap-12px">
          <RedBall :number="1" />
          <RedBall :number="4" />
          <RedBall :number="2" />
          <RedBall :number="3" />
        </div>
        <div class="item flex-shrink-0 flex flex-col gap-12px">
          <GreenBall :number="1" />
          <GreenBall :number="4" />
          <GreenBall :number="2" />
          <GreenBall :number="3" />
        </div>
        <div class="item flex-shrink-0 flex flex-col gap-12px">
          <RedBlueBall :number="1" />
          <RedBlueBall :number="4" />
          <RedBlueBall :number="2" />
          <RedBlueBall :number="3" />
        </div>
        <div class="item flex-shrink-0 flex flex-col gap-12px">
          <GreenBlueBall :number="1" />
          <GreenBlueBall :number="4" />
          <GreenBlueBall :number="2" />
          <GreenBlueBall :number="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RedBall from "./red-ball.vue";
import GreenBall from "./green-ball.vue";
import RedBlueBall from "./red-blue-ball.vue";
import GreenBlueBall from "./green-blue-ball.vue";
</script>

<style></style>
