import { getJsonMinecraft } from './utils/getAllJson.js';

let minecraftElement = document.querySelector('.minecraftVersions');
getJsonMinecraft(['release'], minecraftElement);


document.querySelector('.versionSettings').addEventListener('click', e => {
    let target = e.target;
    let type = [];
    if (!target.classList.contains('checkbox')) return;
    target.classList.toggle('checked');

    document.querySelectorAll('.checkbox').forEach(checkbox => {
        if (checkbox.classList.contains('checked')) type.push(checkbox.classList[1]);
    });

    console.log(type);

    getJsonMinecraft(type, minecraftElement);
})



