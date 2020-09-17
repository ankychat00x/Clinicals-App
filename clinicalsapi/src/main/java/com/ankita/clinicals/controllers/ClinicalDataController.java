package com.ankita.clinicals.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.ankita.clinicals.dto.ClinicalDataRequest;
import com.ankita.clinicals.model.ClinicalData;
import com.ankita.clinicals.model.Patient;
import com.ankita.clinicals.repos.ClinicalDataRepository;
import com.ankita.clinicals.repos.PatientRepository;
import com.ankita.clinicals.util.BMICalculator;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClinicalDataController {

	@Autowired
	private ClinicalDataRepository clinicalDataRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	@RequestMapping(value="/clinicals",method = RequestMethod.POST)
	public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest request) {
		
		Patient patient = patientRepository.findById(request.getPatientId()).get();
		ClinicalData clinicalData = new ClinicalData();
		clinicalData.setComponentName(request.getComponentName());
		clinicalData.setComponentValue(request.getComponentValue());
		clinicalData.setPatient(patient);
		return clinicalDataRepository.save(clinicalData);
	}
	
	
	@RequestMapping(value="/clinicals/{id}/{componentName}",method = RequestMethod.GET)
	public List<ClinicalData> getClinicalData(@PathVariable("id") int patientId,@PathVariable("componentName") String componentName){
		
		 List<ClinicalData> clinicalData = clinicalDataRepository.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId, componentName);
		 
		 if(componentName.equals("bmi")) {
			 componentName = "hw";
		 }
			ArrayList<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
			
			for (ClinicalData eachEntry : duplicateClinicalData) {
				
				BMICalculator.calculateBMI(clinicalData, eachEntry);
			}
		 return clinicalData;
	
	}
	
	

	
	
	
	
	
	
}
