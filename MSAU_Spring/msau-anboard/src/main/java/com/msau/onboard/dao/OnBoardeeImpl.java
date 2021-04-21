package com.msau.onboard.dao;

import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import com.msau.onboard.entity.Skill;
import com.msau.onboard.entity.Skills;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OnBoardeeImpl implements OnBoardeeRepository{

    private static final String SELECT_EVERY_ROW="Select * from onboardee as o,msmanager as m where o.managerId=m.managerId";
    private static final String str="Select * from onboardee as o LEFT JOIN msmanager as m on o.managerId=m.managerId Left join onboardskill as os on o.demandId=os.demandId where o.active=1";
    private static final String SELECT_BY_ID="Select * from onboardee as o LEFT JOIN msmanager as m on o.managerId=m.managerId Left join onboardskill as os on o.demandId=os.demandId and o.demandId=";
    private static final String DELETE_BY_ID="UPDATE onboardee set active=0 where demandId=?";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public OnBoardee saveOnBoardee(OnBoardee onBoardee) {
        return null;
    }

    @Override
    public OnBoardee updateOnBoardee(OnBoardee onBoardee) {
        return onBoardee;
    }

    @Override
    public OnBoardee getOnBoardeebyId(int DemandId) {

        return jdbcTemplate.query(SELECT_BY_ID+Integer.toString(DemandId),new ResultSetExtractor<OnBoardee>(){

            @Override
            public OnBoardee extractData(ResultSet rs) throws SQLException, DataAccessException {
                Map<Integer, OnBoardee> onboardeeKeyOnboardeeMap = new HashMap<Integer, OnBoardee>();
                Map<Integer, Skill> skillKeyskillMap = new HashMap<Integer, Skill>();
                while (rs.next()) {

                    Integer onboardeeKey = rs.getInt("demandId");
                    OnBoardee onBoardee = onboardeeKeyOnboardeeMap.get(onboardeeKey);
                    if (onBoardee == null) {
                        onBoardee = new OnBoardee();
                        onBoardee.setDemandId(onboardeeKey);
                        onBoardee.setFname(rs.getString("fname"));
                        onBoardee.setLname(rs.getString("lname"));
                        onBoardee.setStartDate(rs.getString("startDate"));
                        onBoardee.setBgcStatus(rs.getInt("bgcStatus"));
                        onBoardee.setManagerId(rs.getInt("managerId"));
                        onBoardee.setManager(new MSManager(rs.getInt("managerId"), rs.getString("managerFName"), rs.getString("managerLName")));
                        onBoardee.setLocation(rs.getString("location"));
                        onBoardee.setEtaCompletion(rs.getInt("etaCompletion"));
                        onBoardee.setEmail(rs.getString("email"));
                        onBoardee.setDob(rs.getString("dob"));
                        onBoardee.setOnboardStatus(rs.getInt("onboardStatus"));
                    }
                    Integer id = rs.getInt("id");
                    Skill skill = skillKeyskillMap.get(id);
                    if (skill == null) {
                        skill = new Skill();
                        if (onBoardee.getSkills() == null)
                            onBoardee.setSkills(new Skills());
                        if (onBoardee.getSkills().getSkillList() == null)
                            onBoardee.getSkills().setSkillList(new ArrayList<Skill>());

                        onBoardee.getSkills().getSkillList().add(skill);
                        skillKeyskillMap.put(id, skill);
                        skill.setId(rs.getInt("id"));
                        skill.setSkillName(rs.getString("skillName"));
                        skill.setDemandId(rs.getInt("demandId"));
                        skill.setLevel(rs.getString("level"));
                    }
                    onboardeeKeyOnboardeeMap.put(onboardeeKey,onBoardee);
                }
                return onboardeeKeyOnboardeeMap.get(DemandId);
            }
        });
    }

    @Override
    public List<OnBoardee> getOnBoardees() {
        return jdbcTemplate.query(str, new ResultSetExtractor<List<OnBoardee> >() {
            @Override
            public List<OnBoardee> extractData(ResultSet rs) throws SQLException, DataAccessException {

                List<OnBoardee> list = new ArrayList<>();
                Map<Integer, OnBoardee> onboardeeKeyOnboardeeMap = new HashMap<Integer, OnBoardee>();
                Map<Integer, Skill> skillKeyskillMap = new HashMap<Integer, Skill>();
                while (rs.next()) {

                    Integer onboardeeKey = rs.getInt("demandId");
                    OnBoardee onBoardee = onboardeeKeyOnboardeeMap.get(onboardeeKey);
                    if (onBoardee == null) {
                        onBoardee = new OnBoardee();
                        list.add(onBoardee);
                        onBoardee.setDemandId(onboardeeKey);
                        onBoardee.setFname(rs.getString("fname"));
                        onBoardee.setLname(rs.getString("lname"));
                        onBoardee.setStartDate(rs.getString("startDate"));
                        onBoardee.setBgcStatus(rs.getInt("bgcStatus"));
                        onBoardee.setManagerId(rs.getInt("managerId"));
                        onBoardee.setManager(new MSManager(rs.getInt("managerId"), rs.getString("managerFName"), rs.getString("managerLName")));
                        onBoardee.setLocation(rs.getString("location"));
                        onBoardee.setEtaCompletion(rs.getInt("etaCompletion"));
                        onBoardee.setEmail(rs.getString("email"));
                        onBoardee.setDob(rs.getString("dob"));
                        onBoardee.setOnboardStatus(rs.getInt("onboardStatus"));
                    }
                    Integer id = rs.getInt("id");
                    Skill skill = skillKeyskillMap.get(id);
                    if (skill == null) {
                        skill = new Skill();
                        if (onBoardee.getSkills() == null)
                            onBoardee.setSkills(new Skills());
                        if (onBoardee.getSkills().getSkillList() == null)
                            onBoardee.getSkills().setSkillList(new ArrayList<Skill>());

                        onBoardee.getSkills().getSkillList().add(skill);
                        skillKeyskillMap.put(id, skill);
                        skill.setId(rs.getInt("id"));
                        skill.setSkillName(rs.getString("skillName"));
                        skill.setDemandId(rs.getInt("demandId"));
                        skill.setLevel(rs.getString("level"));
                    }
                    onboardeeKeyOnboardeeMap.put(onboardeeKey,onBoardee);
                }
                return list;
            }
        });
    }

    @Override
    public HashMap<String,String> deleteOnBoardee(int DemandId) {
        HashMap<String, String> map = new HashMap<>();
        jdbcTemplate.update(DELETE_BY_ID,DemandId);
        map.put("status", "200");
        map.put("message", "Onboardee Deleted");
        return map;
    }

}
