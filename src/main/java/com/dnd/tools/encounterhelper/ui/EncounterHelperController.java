package com.dnd.tools.encounterhelper.ui;

import com.dnd.tools.encounterhelper.combatant.Combatant;
import com.dnd.tools.encounterhelper.combatant.CombatantRepository;
import com.dnd.tools.encounterhelper.combatant.InitativeHelper;
import com.dnd.tools.encounterhelper.combatant.NpcCreator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
@AllArgsConstructor
public class EncounterHelperController {

    private final CombatantRepository repository;

    @GetMapping("/encounter-helper")
    public String encounterHelper(Model model) {
        List<Combatant> combatants = StreamSupport.stream(
                repository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        //Sort by Initative
        List<Combatant> initativeSortedCombatants = InitativeHelper.sortByInitative(combatants);

        //Setup form data for player initatives
        PlayerInitativeModel playerInitativeModel = new PlayerInitativeModel();
        initativeSortedCombatants.stream()
                .filter(combatant-> !combatant.isNpc())
                .forEach(player -> playerInitativeModel.getPlayerInitatives().put(player.getName(), 0));

        model.addAttribute("combatants", initativeSortedCombatants);
        model.addAttribute("playerInitative", playerInitativeModel);
        model.addAttribute("combatantHpModel", new CombatantHpModel());
        model.addAttribute("combatantNameModel", new CombatantNameModel());
        model.addAttribute("newCombatantModel", new NewCombatantModel());
        model.addAttribute("newVariableStatCombatantModel", new NewVariableStatNpcModel());
        return "encounter-helper";
    }

    @PostMapping("/new-round")
    public ModelAndView newRound(@ModelAttribute PlayerInitativeModel initativeModel) {
        Map<String, Integer> playerInitatives = initativeModel.getPlayerInitatives();

        //Get all Combatants
        List<Combatant> combatants = StreamSupport.stream(
                repository.findAll().spliterator(), false)
                .collect(Collectors.toList());

        //Set player intatives
        combatants.stream()
                .filter(combatant -> !combatant.isNpc())
                .forEach(player -> repository.setCombatantInitative(
                        player.getName(),
                        playerInitatives.get(player.getName())
                ));

        //Roll and save Npc initatives
        combatants.stream()
                .filter(Combatant::isNpc)
                .peek(InitativeHelper::rollInitative)
                .forEach(npc -> repository.setCombatantInitative(npc.getName(), InitativeHelper.rollInitative(npc)));

        //redirect to a reload of the encounter helper page
        return new ModelAndView("redirect:/encounter-helper");
    }

    @PostMapping("/modify-hp")
    public ModelAndView modifyHp(@ModelAttribute CombatantHpModel combatantHpModel) {
        repository.setCombatantHp(combatantHpModel.getName(), combatantHpModel.getNewHp());

        //redirect to a reload of the encounter helper page
        return new ModelAndView("redirect:/encounter-helper");
    }

    @PostMapping("/remove-combatant")
    public ModelAndView modifyHp(@ModelAttribute CombatantNameModel combatantNameModel) {
        Optional<Combatant> optionalCombatant = repository.findById(combatantNameModel.getName());

        optionalCombatant.ifPresent(repository::delete);

        //redirect to a reload of the encounter helper page
        return new ModelAndView("redirect:/encounter-helper");
    }

    @PostMapping("/new-combatant")
    public ModelAndView newCombatant(@ModelAttribute NewCombatantModel newCombatantModel) {
        repository.save(new Combatant(
                newCombatantModel.getName(),
                newCombatantModel.getArmourClass(),
                newCombatantModel.getMaxHp(),
                newCombatantModel.getInitativeBonus(),
                newCombatantModel.isNpc()));

        //redirect to a reload of the encounter helper page
        return new ModelAndView("redirect:/encounter-helper");
    }

    @PostMapping("/new-npcs")
    public ModelAndView newNpc(@ModelAttribute NewVariableStatNpcModel newVariableStatNpcModel) {
        //int numberOfEnemies, String name, int armourClass, int hitDie, int level, int conMod, int initativeBonus
        repository.saveAll(NpcCreator.createTemplatedNpc(
                newVariableStatNpcModel.getNumberOfEnemies(),
                newVariableStatNpcModel.getName(),
                newVariableStatNpcModel.getArmourClass(),
                newVariableStatNpcModel.getHitDie(),
                newVariableStatNpcModel.getLevel(),
                newVariableStatNpcModel.getConMod(),
                newVariableStatNpcModel.getInitativeBonus()
        ));

        //redirect to a reload of the encounter helper page
        return new ModelAndView("redirect:/encounter-helper");
    }
}
