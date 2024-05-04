<template>
  <div class="game-tabs flex justify-between px-16px">
    <div
      class="flex items-center bg-fog-50 w-92px h-27px rounded-4px justify-center"
    >
      <img
        class="h-20px w-20px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFw2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTEyLTAyVDIxOjU3OjUwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTEyLTAyVDIxOjU3OjUwKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNDI3ZWNiMy1lODUxLTQyMzMtODViOS1iMmUzYWQzYjlhYzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZGZmMWRlMTQtMTM2Zi00MzY0LWI2YzQtMTRmOTA2OTE3MTlkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZGZmMWRlMTQtMTM2Zi00MzY0LWI2YzQtMTRmOTA2OTE3MTlkIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkZmYxZGUxNC0xMzZmLTQzNjQtYjZjNC0xNGY5MDY5MTcxOWQiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNDI3ZWNiMy1lODUxLTQyMzMtODViOS1iMmUzYWQzYjlhYzQiIHN0RXZ0OndoZW49IjIwMjMtMTItMDJUMjE6NTc6NTArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp0mjqsAAAFkSURBVFiF7dixUcMwGEDhZ44BNEI2SEYILR0dHaaiTNgAJiCUVDgdHdDQkhGSDWACwgSmEBwk+oXkSFZU6N2lUc7Od5ajk121bUvOHewb4KoAQyvA0LIHHkqDdw8vPscqYAJcx8JcnB4bYyLQIwW8AiNgAJzveB5nu0yx4hcHUAP3cThmXYGKTdxPVQyMVBegQsbN0Vexl3yBij3gwA+okHErYBqXY+bzL14AQ2F8CHxE1Qj3susKNsi4ZP0HbICzRA5rNmBDBjiwA2v0/ZD64w3MpgIMzbYOjoCbhA6wLPw2oALG/VmMPrFs2XKZ4inwJn2RA3COXnfFbFO8BI4iQwaYG1vnhsMGXKM3CTFbCmP1929ZSzXFM8xNxyUyeqMUwDH66e9vz2i0s76BCnjcGnunwy68b2CNRm6PrX1P0DdwBpygF2LQD/mLLidIcQ8+oZeYW+Cq68FVecMaWAGGVoChfQHRBzQlXKzXJQAAAABJRU5ErkJggg=="
        alt=""
      />
      <span class="text-14px">R</span>
    </div>
    <div
      class="w-125px flex justify-center items-center"
      :class="value === 'bet' && 'tab-active'"
      @click="emits('update:value', 'bet')"
    >
      <div class="w-15px flex justify-center h-25px">
        bet
      </div>
    </div>
    <div
      class="w-125px flex justify-center items-center"
      :class="value === 'Trend' && 'tab-active'"
      @click="emits('update:value', 'Trend')"
    >
      <div class="w-15px flex justify-center h-25px">Trend</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
}>();
const emits = defineEmits(["update:value"]);
</script>

<style lang="less" scoped>
.game-tabs {
  .tab-active {
    > div {
      border-bottom: 2px solid var(--border-1);
      color: var(--text-1);
    }
  }
}
</style>
