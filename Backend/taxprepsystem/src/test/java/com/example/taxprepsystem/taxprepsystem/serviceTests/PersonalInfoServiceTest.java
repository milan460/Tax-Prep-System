package com.example.taxprepsystem.taxprepsystem.serviceTests;



import com.example.taxprepsystem.taxprepsystem.models.PersonalInfo;
import com.example.taxprepsystem.taxprepsystem.repositories.PersonalInfoRepository;
import com.example.taxprepsystem.taxprepsystem.services.PersonalInfoService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class PersonalInfoServiceTest {

    @Mock
    private PersonalInfoRepository personalInfoRepository;

    @InjectMocks
    private PersonalInfoService personalInfoService;
    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void testFindPersonalInfoFormByIdWhenFound() {
        PersonalInfo expectedInfo = new PersonalInfo();
        when(personalInfoRepository.findById(1)).thenReturn(Optional.of(expectedInfo));

        PersonalInfo result = personalInfoService.findPersonalInfoFormById(1);

        assertNotNull(result);
        assertEquals(expectedInfo, result);
    }

    @Test
    public void testFindPersonalInfoFormByIdWhenNotFound() {
        when(personalInfoRepository.findById(1)).thenReturn(Optional.empty());

        PersonalInfo result = personalInfoService.findPersonalInfoFormById(1);

        assertNull(result);
    }

    @Test
    public void testFindAllPersonalInfoForms() {
        List<PersonalInfo> expectedList = Arrays.asList(new PersonalInfo(), new PersonalInfo());
        when(personalInfoRepository.findAll()).thenReturn(expectedList);

        List<PersonalInfo> result = personalInfoService.findAllPersonalInfoForms();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedList, result);
    }

    @Test
    public void testFindPersonalInfoFormByUserIdWhenFound() {
        PersonalInfo expectedInfo = new PersonalInfo();
        when(personalInfoRepository.findPersonalInfoFormByUserId(1)).thenReturn(Optional.of(expectedInfo));

        PersonalInfo result = personalInfoService.findPersonalInfoFormByUserId(1);

        assertNotNull(result);
        assertEquals(expectedInfo, result);
    }

    @Test
    public void testFindPersonalInfoFormByUserIdWhenNotFound() {
        when(personalInfoRepository.findPersonalInfoFormByUserId(1)).thenReturn(Optional.empty());

        PersonalInfo result = personalInfoService.findPersonalInfoFormByUserId(1);

        assertNull(result);
    }

    @Test
    public void testCreatePersonalInfoForm() {
        PersonalInfo personalInfo = new PersonalInfo();
        when(personalInfoRepository.save(personalInfo)).thenReturn(personalInfo);

        PersonalInfo result = personalInfoService.createPersonalInfoForm(personalInfo);

        assertNotNull(result);
        assertEquals(personalInfo, result);
    }

    @Test
    public void testUpdatePersonalInfoForm() {
        PersonalInfo personalInfo = new PersonalInfo();
        when(personalInfoRepository.save(personalInfo)).thenReturn(personalInfo);

        PersonalInfo result = personalInfoService.updatePersonalInfoForm(personalInfo);

        assertNotNull(result);
        assertEquals(personalInfo, result);
    }

    @Test
    public void testUpdatePersonalInfoByUserIdWhenFound() {
        PersonalInfo existingInfo = new PersonalInfo();
        PersonalInfo formData = new PersonalInfo();
        when(personalInfoRepository.findPersonalInfoFormByUserId(1)).thenReturn(Optional.of(existingInfo));
        when(personalInfoRepository.save(existingInfo)).thenReturn(existingInfo);

        PersonalInfo result = personalInfoService.updatePersonalInfoByUserId(1, formData);

        assertNotNull(result);
        assertEquals(existingInfo, result);
    }

    @Test
    public void testUpdatePersonalInfoByUserIdWhenNotFound() {
        PersonalInfo formData = new PersonalInfo();
        when(personalInfoRepository.findPersonalInfoFormByUserId(1)).thenReturn(Optional.empty());

        PersonalInfo result = personalInfoService.updatePersonalInfoByUserId(1, formData);

        assertNull(result);
    }

    @Test
    public void testDeletePersonalInfoForm() {
        PersonalInfo personalInfo = new PersonalInfo();
        when(personalInfoRepository.findById(1)).thenReturn(Optional.of(personalInfo));
        doNothing().when(personalInfoRepository).delete(personalInfo);

        personalInfoService.deletePersonalInfoForm(1);

        verify(personalInfoRepository, times(1)).delete(personalInfo);
    }


}
