package com.msau.onboard.controller;

import com.msau.onboard.entity.OnBoardee;
import com.msau.onboard.entity.Skills;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.Assert;
import org.junit.runner.RunWith;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class StepDefinitions extends  SpringIntegrationTest{
    private static ResponseEntity response;
    @When("^I send a get request")
    public void fetchOnboardees() throws Throwable{
        //POST Method to Add New Employee
        RestTemplate restTemplate = new RestTemplate ();
        response = restTemplate.getForEntity("http://localhost:8080/api/fetch_onboardees", String.class);

    }

    @Then("^I receive a valid response")
    public void fetchOnboardeesResponse() throws Throwable {
Assert.assertEquals(response.getStatusCodeValue(),200);
    }

    @When("^I try to fetch Managers")
    public void fetchManagers() throws Throwable{
        RestTemplate restTemplate = new RestTemplate ();
        response = restTemplate.getForEntity("http://localhost:8080/api/fetch_managers", String.class);

    }
    @Then("^I receive a list of Managers")
    public void managersResponse() throws Throwable {
        Assert.assertEquals(response.getStatusCodeValue(),200);
    }

    @When("^I try to get (.+) trends")
    public void Trends(String type) throws Throwable{
        RestTemplate restTemplate = new RestTemplate ();
        if (type=="skill"){
            response = restTemplate.getForEntity("http://localhost:8080/api/skills", String.class);

        }
        else if(type=="location"){
            response = restTemplate.getForEntity("http://localhost:8080/api/location", String.class);

        }else if(type=="manager"){
            response = restTemplate.getForEntity("http://localhost:8080/api/managerTrends", String.class);

        }else{
            response = restTemplate.getForEntity("http://localhost:8080/api/yearTrends", String.class);

        }

    }
    @Then("^I receive (.+) trends")
    public void trendsResponse(String type) throws Throwable {
        Assert.assertEquals(response.getStatusCodeValue(),200);
    }

    @When("^I try to fetch Onboardee By Id (\\d+)")
    public void fetchOnboardeeById(int id) throws Throwable {
        RestTemplate restTemplate = new RestTemplate ();
        response = restTemplate.getForEntity("http://localhost:8080/api/fetch_onboardees/"+Integer.toString(id), String.class);

    }

    @Then("^I get an onboardee with given id")
    public void byIdResponse() throws Throwable {
        Assert.assertEquals(response.getStatusCodeValue(),200);
    }

}
