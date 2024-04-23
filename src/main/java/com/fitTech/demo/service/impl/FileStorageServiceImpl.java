package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.FileDataRepository;
import com.fitTech.demo.models.FileData;
import com.fitTech.demo.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Autowired
    private FileDataRepository fileDataRepository;
    public FileData store(MultipartFile file, String userEmail) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileData fileData = new FileData(fileName, file.getContentType(), file.getBytes());
        fileData.setUserEmail(userEmail);
        return fileDataRepository.save(fileData);
    }

    @Override
    public  FileData getFile(String id) {
        return fileDataRepository.findById(id).get();
    }

    @Override
    public  FileData getFilebyuserEmail(String userEmail) {
        for (FileData file: fileDataRepository.findAll()){
            if (file.getUserEmail().equals(userEmail)) {
                return file;
            }
        } return null;
    }

    @Override
    public  Stream<FileData> getAllFiles() {
        return fileDataRepository.findAll().stream();
    }
}




