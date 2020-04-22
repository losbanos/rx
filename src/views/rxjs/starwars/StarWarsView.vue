<template>
    <div id="starwars">
        <h3>StarWars People</h3>
        <ul>
            <li v-for="user of items" :key="user.name">
                <dt>{{user.name}}</dt>
                <dd>키 : {{user.height}}</dd>
                <dd>몸무게 : {{user.mass}}</dd>
                <dd>BROCA 표준 체중: {{user.broca}}</dd>
                <dd>Broca 비만도: {{user.obesityUsingBroca}}</dd>
                <dd> BMI 표준 체중: {{user.bmi}}</dd>
                <dd> BMI 비만도: {{user.obesityUsingBmi}}</dd>
            </li>
        </ul>
    </div>
</template>
<script src="./StarWarsView.ts" lang="ts"></script>