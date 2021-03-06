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

export function createAlbum(data) {
    return {
        type: ActionTypes.CREATE_ALBUM_REQUEST,
        payload: data,
    }
}

export function deleteAlbum(id) {
    return {
        type: ActionTypes.DELETE_ALBUM_REQUEST,
        payload: id,
    }
}

export function editAlbum(data) {
    return {
        type: ActionTypes.EDIT_ALBUM_REQUEST,
        payload: data,
    }
}


export function setCurrentAlbum(albumId) {
    return {
        type: ActionTypes.SET_CURRENT_ALBUM,
        albumId: Number(albumId),
    }
}

export function getPhotosAll() {
    return {
        type: ActionTypes.GET_PHOTOS_REQUEST,
        mode: PHOTO_FETCH_MODE.ALL,
    }
}

export function createPhoto(data) {
    return {
        type: ActionTypes.CREATE_PHOTO_REQUEST,
        payload: data,
    }
}

export function getAlbumPhotos(albumId) {
    return {
        type: ActionTypes.GET_PHOTOS_REQUEST,
        mode: PHOTO_FETCH_MODE.ALBUM,
        albumId: Number(albumId),
    }
}

export function setCurrentPhoto(photoId) {
    return {
        type: ActionTypes.SET_CURRENT_PHOTO,
        photoId: Number(photoId)
    }
}

export function saveUserKey(data) {
    return {
        type: ActionTypes.SAVE_USER_KEY,
        payload: data,
    }
}

export function deleteUserData(data) {
    return {
        type: ActionTypes.DELETE_USER_DATA_REQUEST,
        payload: data,
    }
}

export function postLogin(data) {
    return {
        type: ActionTypes.LOGIN_USER_REQUEST,
        payload: data,
    }
}

export function createComment(text, photoId) {
    return {
        type: ActionTypes.CREATE_COMMENT_REQUEST,
        text,
        photoId: Number(photoId)
    }
}