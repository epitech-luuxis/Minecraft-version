import { getJsonMinecraft, getLoadderMinecraft, loaderList } from './utils/getAllJson.js';

document.addEventListener('DOMContentLoaded', e => {
    let minecraftVersion;
    let minecraftElement = document.querySelector('.minecraftVersions');
    let popup = document.querySelector('.resultPopup');
    getJsonMinecraft(['release'], minecraftElement);

    document.querySelector('.versionSettings').addEventListener('click', e => {
        let target = e.target;
        let type = [];
        let checked = document.querySelectorAll('.checked');

        if (target.classList.contains('checkbox')) {
            if (checked.length === 1 && target.classList.contains('checked')) return;

            target.classList.toggle('checked');

            document.querySelectorAll('.checkbox').forEach(checkbox => {
                if (checkbox.classList.contains('checked')) {
                    type.push(checkbox.classList[1]);
                }
            });
            getJsonMinecraft(type, minecraftElement);
        }
    })

    document.querySelector('.minecraftVersions').addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('version')) {
            document.body.style.overflow = 'hidden';
            popup.classList.toggle('showPopup');
            minecraftVersion = target.id;
        }
    })

    popup.addEventListener('click', async e => {
        let target = e.target;

        if (target.classList.contains('closePopup')) {
            document.body.style.overflow = 'auto';
            popup.classList.toggle('showPopup');
            document.querySelectorAll('.loadderList').forEach(loadderList => {
                loadderList.innerHTML = '';
            })

            document.querySelectorAll('.loadder').forEach(loadder => {
                loadder.classList.remove('active');
            })
        }

        if (target.classList.contains('loadder')) {
            let loadderType = target.classList[1];
            let loadderVersion = await getLoadderMinecraft(minecraftVersion, loadderType);
            let loadderElement = document.querySelector(`.${loadderType} .loadderList`);

            if (target.classList.contains('active')) {
                target.classList.toggle('active');
                loadderElement.innerHTML = '';
                return;
            } else {
                target.classList.toggle('active');
            }

            if (loadderVersion.length <= 0) {
                loadderElement.innerHTML = 'Aucune version disponible';
                return;
            }


            if (loadderType === 'forge') {
                loadderVersion.forEach(version => {
                    let a = document.createElement('a');
                    a.href = loaderList()[loadderType].install.replace(/\$\{version\}/g, version);
                    a.classList.add('loadderVersion');
                    a.target = '_blank';
                    a.classList.add('loadderVersionLink');
                    a.innerHTML = `forge-${version}-installer.jar`;
                    loadderElement.appendChild(a);
                })
            }

            if (loadderType === 'fabric' || loadderType === 'legacyfabric' || loadderType === 'quilt') {
                loadderVersion.forEach(version => {
                    let a = document.createElement('a');
                    let downloadLink = loaderList()[loadderType].json.replace(/\$\{version\}/g, minecraftVersion).replace(/\$\{build\}/g, version);
                    a.classList.add('loadderVersion');
                    a.href = downloadLink;
                    a.target = '_blank';
                    a.innerHTML = `${loadderType}-loader-${minecraftVersion}-${version}.json`;
                    loadderElement.appendChild(a);
                })
            }

            if (loadderType === 'neoforge') {
                loadderVersion.forEach(version => {
                    let a = document.createElement('a');
                    let downloadLink = loaderList()[loadderType].install.replace(/\$\{version\}/g, version);
                    a.classList.add('loadderVersion');
                    a.href = downloadLink;
                    a.target = '_blank';
                    a.innerHTML = `forge-${version}-installer.jar`;
                    loadderElement.appendChild(a);
                })
            }
        }
    })
})