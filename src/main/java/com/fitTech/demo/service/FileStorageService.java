package com.fitTech.demo.service;

import com.fitTech.demo.data.FileDataRepository;
import com.fitTech.demo.models.FileData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public interface FileStorageService {

    @Autowired
    FileDataRepository fileDataRepository = null;
    public default FileData store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileData FileData = new FileData(fileName, file.getContentType(), file.getBytes());

        return fileDataRepository.save(FileData);
    }

    public default FileData getFile(String id) {
        return fileDataRepository.findById(id).get();
    }

    public default Stream<FileData> getAllFiles() {
        return fileDataRepository.findAll().stream();
    }
}
