import * as ActionTypes from "../constants/actions-types";
import {PHOTO_FETCH_MODE} from "../constants/networking";

export function getUser(data) {
    return {
        type: ActionTypes.GET_USER_REQUEST,
        payload: data,
    }
}

export function postRegister(data) {
    return {
        type: ActionTypes.POST_USER_REQUEST,
        payload: data,
    }
}

export function getAlbums() {
    return {
        type: ActionTypes.GET_ALBUMS_REQUEST,
    }
}

export function getPhotosAll() {
    return {
        type: ActionTypes.GET_PHOTOS_REQUEST,
        mode: PHOTO_FETCH_MODE.ALL,
    }
}

export function getPhotosAlbum(albumId) {
    return {
        type: ActionTypes.GET_PHOTOS_REQUEST,
        mode: PHOTO_FETCH_MODE.ALBUM,
        albumId
    }
}