
<!-- 写法一 -->
<button
	class="card"
	style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"
	on:click={() => flipped = !flipped}
>

<!-- 写法二 -->
<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"
	on:click={() => flipped = !flipped}
>

<!-- 支持style 和 class 混合写法 -->

