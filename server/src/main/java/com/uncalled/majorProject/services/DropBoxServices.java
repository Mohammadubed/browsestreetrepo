package com.uncalled.majorProject.services;
import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.WriteMode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Service
public class DropBoxServices {

    private final DbxClientV2 dropboxClient;

    // Constructor with injected access token
    @Value("${dropbox.api-key}")
    private String ACCESS_TOKEN;
    public DropBoxServices() {

          // Use your token
        this.dropboxClient = new DbxClientV2(new com.dropbox.core.DbxRequestConfig("dropbox/apps/shopandserviceapp"), ACCESS_TOKEN);
    }

    // Upload file to Dropbox and return the file's URL
    public String uploadFile(MultipartFile file) throws DbxException, IOException {

        try (InputStream in = file.getInputStream()) {
            // Upload the file to Dropbox
            FileMetadata metadata = dropboxClient.files().uploadBuilder("/" + file.getOriginalFilename())
                    .withMode(WriteMode.OVERWRITE)
                    .uploadAndFinish(in);

            // Get shared link (URL) for the file
            return getSharedLink(metadata.getPathLower());
        } catch (Exception e){

            log.error("An Exception Occurred in Thread App/services/DropBoxServices.upload with logs:" , e);
            return null;
        }
    }

    // Generate a shared link for the file
    private String getSharedLink(String filePath) throws DbxException {

        String str = dropboxClient.sharing()
                .createSharedLinkWithSettings(filePath)
                .getUrl();
        return str.replace("&dl=0", "&raw=1");
    }
}