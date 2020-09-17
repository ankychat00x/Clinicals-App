package com.ankita.clinicals.repos;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ankita.clinicals.model.Patient;


public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
