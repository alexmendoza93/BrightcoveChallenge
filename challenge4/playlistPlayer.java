package com.example.alexbrightcoveapp;



import android.os.Bundle;

import com.brightcove.player.analytics.Analytics;
import com.brightcove.player.edge.Catalog;
import com.brightcove.player.edge.PlaylistListener;
import com.brightcove.player.edge.VideoListener;
import com.brightcove.player.event.EventEmitter;
import com.brightcove.player.model.DeliveryType;
import com.brightcove.player.model.Playlist;
import com.brightcove.player.model.Video;
import com.brightcove.player.view.BrightcoveExoPlayerVideoView;
import com.brightcove.player.view.BrightcovePlayer;

import java.net.URISyntaxException;

public class MainActivity extends BrightcovePlayer {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        brightcoveVideoView = (BrightcoveExoPlayerVideoView) findViewById(R.id.brightcove_video_view);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Video video = Video.createVideo("https://sdks.support.brightcove.com/assets/videos/hls/greatblueheron/greatblueheron.m3u8",
                DeliveryType.HLS);
        /**
         * this code is for playing a video
         *
        Analytics analytics = brightcoveVideoView.getAnalytics();
        analytics.setAccount("6302597822001");
        try {
            java.net.URI myposterImage = new java.net.URI("https://sdks.support.brightcove.com/assets/images/general/Great-Blue-Heron.png");
            video.getProperties().put(Video.Fields.STILL_IMAGE_URI, myposterImage);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        brightcoveVideoView.add(video);
        brightcoveVideoView.start();
        */
        /**
         * from now on is the practice of playing a video from a video cloud
         * ---------------------------------
         */
        EventEmitter eventEmitter = brightcoveVideoView.getEventEmitter();
        String account = getString(R.string.account);
        Catalog catalog = new Catalog.Builder(eventEmitter, account)
                .setBaseURL(Catalog.DEFAULT_EDGE_BASE_URL)
                .setPolicy(getString(R.string.policy))
                .build();
        /**
         * this code Retrieves a video from the catalog exercise
         *
        catalog.findVideoByID(getString(R.string.videoId), new VideoListener() {

            @Override
            public void onVideo(Video video) {
                // Add video to the view
                brightcoveVideoView.add(video);
                // Start video playback
                brightcoveVideoView.start();
        */
        /**Get and play a playlist excercise
         * -------------------------------------
         * */
        
        
        String playlist = getString(R.string.playlistId);
        catalog.findPlaylistByID(playlist, new PlaylistListener() {
            @Override
            public void onPlaylist(Playlist playlist) {
                // Add playlist to the view
                brightcoveVideoView.addAll(playlist.getVideos());
                // Start playback
                brightcoveVideoView.start();
            }

        });
    }
}