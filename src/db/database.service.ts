import { Injectable } from '@nestjs/common';
import { Album } from '../albums/albumType';
import { Artist } from '../artists/artistInterface';
import { Favorites } from '../favorites/favoritesTypes';
import { Track } from '../tracks/trackInterface';
import { User } from '../users/userTypes';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}

@Injectable()
export class newDb {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly tracks: Track[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User | null {
    const user = this.users.find((us) => us.id === id);
    return user || null;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  changeUser(id: string, newPassword: string): void {
    const user = this.getUser(id);
    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((us) => us.id === id);
    this.users.splice(userIndex, 1);
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track | null {
    const track = this.tracks.find((tr) => tr.id === id);
    return track || null;
  }

  addTrack(track: Track): void {
    this.tracks.push(track);
  }

  changeTrack(id: string, newTrack: Track): void {
    const track = this.getTrack(id);
    Object.keys(track).forEach((key) => {
      track[key] = newTrack[key];
    });
  }

  deleteTrack(id: string): void {
    const trackId = this.tracks.findIndex((tr) => tr.id === id);
    this.tracks.splice(trackId, 1);
  }

  deleteArtistFromTrack(artistId: string): void {
    this.tracks.forEach((tr) => {
      if (tr.artistId === artistId) tr.artistId = null;
    });
  }

  deleteAlbumFromTrack(albumId: string): void {
    this.tracks.forEach((tr) => {
      if (tr.albumId === albumId) tr.albumId = null;
    });
  }

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtist(id: string): Artist | null {
    const artist = this.artists.find((art) => art.id === id);
    return artist || null;
  }

  addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  changeArtist(id: string, newArtist: Artist): void {
    const artist = this.getArtist(id);
    Object.keys(artist).forEach((key) => {
      artist[key] = newArtist[key];
    });
  }

  deleteArtist(id: string): void {
    const artistIndex = this.artists.findIndex((art) => art.id === id);
    this.artists.splice(artistIndex, 1);
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbum(id: string): Album | null {
    const album = this.albums.find((alb) => alb.id === id);
    return album || null;
  }

  addAlbum(album: Album): void {
    this.albums.push(album);
  }

  changeAlbum(id: string, newAlbum: Album): void {
    const album = this.getAlbum(id);
    Object.keys(album).forEach((key) => {
      album[key] = newAlbum[key];
    });
  }

  deleteAlbum(id: string): void {
    const albumIndex = this.albums.findIndex((alb) => alb.id === id);
    this.albums.splice(albumIndex, 1);
  }

  deleteArtistFromAlbum(artistId: string): void {
    this.albums.forEach((alb) => {
      if (alb.artistId === artistId) alb.artistId = null;
    });
  }

  getAllFavorites(): Favorites {
    return this.favorites;
  }

  getTrackFromFavs(id: string): boolean {
    if (this.favorites.tracks.length < 1) return false;
    const trackInFavs = this.favorites.tracks.includes(id);
    return trackInFavs;
  }

  addTrackToFavs(id: string): void {
    this.favorites.tracks.push(id);
  }

  deleteTrackFromFavs(id: string): void {
    if (this.favorites.tracks.length < 1) return;
    const trackId: number = this.favorites.tracks.findIndex((tr) => tr === id);
    this.favorites.tracks.splice(trackId, 1);
  }

  getArtistFromFavs(id: string): boolean {
    const artistIsInFavs = this.favorites.artists.includes(id);
    return artistIsInFavs;
  }

  addArtistToFavs(id: string): void {
    this.favorites.artists.push(id);
  }

  deleteArtistFromFavs(id: string): void {
    const artistId: number = this.favorites.artists.findIndex(
      (art) => art === id,
    );
    this.favorites.artists.splice(artistId, 1);
  }

  getAlbumFromFavs(id: string): boolean {
    const albumInFavs = this.favorites.albums.includes(id);
    return albumInFavs;
  }

  addAlbumToFavs(id: string): void {
    this.favorites.albums.push(id);
  }

  deleteAlbumFromFavs(id: string): void {
    const albumId: number = this.favorites.albums.findIndex(
      (alb) => alb === id,
    );
    this.favorites.albums.splice(albumId, 1);
  }
}
