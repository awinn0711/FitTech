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
    public FileData store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileData FileData = new FileData(fileName, file.getContentType(), file.getBytes());

        return fileDataRepository.save(FileData);
    }

    @Override
    public  FileData getFile(String id) {
        return fileDataRepository.findById(id).get();
    }

    @Override
    public  Stream<FileData> getAllFiles() {
        return fileDataRepository.findAll().stream();
    }
}




