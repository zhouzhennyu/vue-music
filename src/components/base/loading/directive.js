import { createApp } from 'vue';
import loading from './loading.vue';
import { addClass, removeClass} from '@/assets/js/dom.js';

const relativeCls = 'g-relative';

const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(loading);
        const instance = app.mount(document.createElement('div'));
        el.instance = instance;
        const title = binding.arg;
        if (typeof title !== 'undefined') {
            instance.setTitle(title);
        }
        if (binding.value) {
            append(el);
        }
    },
    updated(el, binding) {
        const title = binding.arg;
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title);
        }
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el);
        }
    },
    
}

function append(el) {
    const styles = getComputedStyle(el);
    if (['fixed', 'absolute', 'relative'].indexOf(styles.position) === -1) {
        addClass(el, relativeCls);
    }
    el.appendChild(el.instance.$el);
}

function remove(el) {
    removeClass(el, relativeCls);
    el.removeChild(el.instance.$el)
}


export default loadingDirective;