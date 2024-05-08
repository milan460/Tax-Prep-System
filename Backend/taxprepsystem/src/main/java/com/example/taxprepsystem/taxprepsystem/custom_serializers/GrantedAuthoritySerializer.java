package com.example.taxprepsystem.taxprepsystem.custom_serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;

public class GrantedAuthoritySerializer extends StdSerializer<GrantedAuthority> {
    public GrantedAuthoritySerializer() {
        super(GrantedAuthority.class);
    }
    //rules for serializing the GrantedAuthority object
    @Override
    public void serialize(GrantedAuthority value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        System.out.println("Serializing GrantedAuthority");
        gen.writeString(value.getAuthority());
    }
}
