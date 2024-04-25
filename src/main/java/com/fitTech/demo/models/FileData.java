package com.fitTech.demo.models;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Blob;

@Entity
@Table(name = "files")
public class FileData {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String userEmail;

    private String name;

    private String type;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    public FileData() {
    }

    public FileData(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }


}
