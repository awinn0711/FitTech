package com.fitTech.demo.service;

import com.fitTech.demo.data.FileDataRepository;
import com.fitTech.demo.models.FileData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;


public interface FileStorageService {


    FileData store(MultipartFile file, String userEmail)throws IOException;


    FileData getFile(String id);

    FileData getFilebyuserEmail (String userEmail);

    Stream<FileData> getAllFiles();

}