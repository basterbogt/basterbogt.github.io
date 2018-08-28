import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';
import {MDCList} from '@material/list';
import {MDCTopAppBar} from '@material/top-app-bar/index';

const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const ripple = new MDCRipple(document.querySelector('.foo-button'));

function reloadList(){

    var listEle = document.querySelector('#main');
    var list = new MDCList(listEle);
    // list.singleSelection = true;
}

reloadList();

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
