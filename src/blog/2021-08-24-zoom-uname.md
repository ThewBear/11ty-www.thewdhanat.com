---
title: Set Zoom display name before joining with bookmarklet
description: Set Zoom meeting display name before joining with browser bookmarklet; Zoom bookmarklet generator; Zoom meeting bookmarklet usage
---

Zoom meeting link has an optional `uname` query parameter that sets your display name before joining the meeting.

You can create a [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) to apply your display name before opening the meeting.

## Generator

Use this generator to create a zoom meeting display name bookmarklet.

<div class="">
  <div class="flex items-center">
    <label class="block " for="uname">Display name:</label>
    <input class="block ml-2 p-2 border-2 border-gray-400 rounded-md" id="uname" size="30">
  </div>
  <p>Drag <a id="bookmarklet" class="p-1 border border-indigo-600 hover:bg-indigo-100" href="">zoom bookmarklet</a> to your bookmark bar. You can then rename it and add as many as you want.</p>
  <script defer>
    function setHref(name) {
      const nameString = JSON.stringify(name);
      const href = `javascript:(function(){
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("uname", ${nameString})
        window.location.search = searchParams;
      })()`
      document.getElementById("bookmarklet").href = encodeURI(href)
    }
    document.getElementById("uname").addEventListener("change", (e) => {
      setHref(e.target.value)
    })
    setHref("")
  </script>
</div>

## Usage

1. Open the meeting link. You can get a test one [here](https://zoom.us/test).

2. Before you click the "_Launch Meeting_" button, click your **zoom bookmarklet**. If the "_Open Zoom Meetings_" dialog shows up, choose the cancel button first.

3. Click the "_Launch Meeting_" button to launch Zoom.
